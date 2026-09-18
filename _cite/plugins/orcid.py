import json
from urllib.request import Request, urlopen
from util import *
from manubot.cite.handlers import prefix_to_handler as manubot_prefixes


def main(entry):
    """
    receives single list entry from orcid data file
    returns list of sources to cite
    """

    # orcid api
    endpoint = "https://pub.orcid.org/v3.0/$ORCID/works"
    headers = {"Accept": "application/json"}

    # get id from entry
    _id = get_safe(entry, "orcid", "")
    if not _id:
        raise Exception('No "orcid" key')

    # query api
    @log_cache
    @cache.memoize(name=__file__, expire=1 * (60 * 60 * 24))
    def query(_id):
        url = endpoint.replace("$ORCID", _id)
        request = Request(url=url, headers=headers)
        response = json.loads(urlopen(request).read())
        return get_safe(response, "group", [])

    response = query(_id)

    # --- 추가: 논문별 상세 정보에서 contributor(공저자) 목록 읽기 ---
    # ORCID 요약 목록(/works)에는 공저자가 없어서, 상세 정보(/works/{put-codes})를
    # 최대 100개씩 묶어 한 번에 조회한다.
    @log_cache
    @cache.memoize(name=__file__ + ".details", expire=1 * (60 * 60 * 24))
    def query_details(_id, put_codes):
        url = endpoint.replace("$ORCID", _id) + "/" + ",".join(put_codes)
        request = Request(url=url, headers=headers)
        details = json.loads(urlopen(request).read())
        return get_safe(details, "bulk", [])

    contributors_by_put_code = {}
    all_put_codes = [
        str(get_safe(summary, "put-code", ""))
        for work in response
        for summary in get_safe(work, "work-summary", [])
        if get_safe(summary, "put-code", "")
    ]
    try:
        for start in range(0, len(all_put_codes), 100):
            chunk = tuple(all_put_codes[start : start + 100])
            for item in query_details(_id, chunk):
                work_detail = get_safe(item, "work", {})
                put_code = str(get_safe(work_detail, "put-code", ""))
                names = []
                for contributor in get_safe(work_detail, "contributors.contributor", []) or []:
                    role = get_safe(contributor, "contributor-attributes.contributor-role", "") or ""
                    name = (get_safe(contributor, "credit-name.value", "") or "").strip()
                    # 저자(author)만, 역할 표기가 없으면 저자로 간주
                    if name and role.lower() in ["", "author"]:
                        names.append(name)
                if put_code and names:
                    contributors_by_put_code[put_code] = names
    except Exception as e:
        # 상세 정보 조회에 실패해도 기존 동작(요약 목록 기반)은 그대로 진행
        log(f"Couldn't get ORCID contributors: {e}", indent=3, level="WARNING")
    # --- 추가 끝 ---

    # list of sources to return
    sources = []

    # go through response structure and pull out ids e.g. doi:1234/56789
    for work in response:
        # get list of ids
        ids = []
        for summary in get_safe(work, "work-summary", []):
            ids = ids + get_safe(summary, "external-ids.external-id", [])

        # find first id of particular "relationship" type
        _id = next(
            (
                id
                for id in ids
                if get_safe(id, "external-id-relationship", "")
                in ["self", "version-of", "part-of"]
            ),
            ids[0] if len(ids) > 0 else None,
        )

        if _id == None:
            continue

        # get id and id-type from response
        id_type = get_safe(_id, "external-id-type", "")
        id_value = get_safe(_id, "external-id-value", "")

        # create source
        source = {"id": f"{id_type}:{id_value}"}

        # if not an id type that Manubot can cite, keep citation details
        if id_type not in manubot_prefixes:
            # get summaries
            summaries = get_safe(work, "work-summary", [])

            # get first summary with defined sub-value
            def first(get_func):
                return next(
                    (value for value in map(get_func, summaries) if value), None
                )

            # get title
            title = first(lambda s: get_safe(s, "title.title.value", ""))

            # get publisher
            publisher = first(lambda s: get_safe(s, "journal-title.value", ""))

            # get date
            date = (
                get_safe(work, "last-modified-date.value")
                or first(lambda s: get_safe(s, "last-modified-date.value"))
                or get_safe(work, "created-date.value")
                or first(lambda s: get_safe(s, "created-date.value"))
                or 0
            )

            # get link
            link = first(lambda s: get_safe(s, "url.value", ""))

            # keep available details
            if title:
                source["title"] = title
            if publisher:
                source["publisher"] = publisher
            if date:
                source["date"] = format_date(date)
            if link:
                source["link"] = link

        # --- 추가: ORCID에 등록된 공저자 목록을 예비용으로 보관 ---
        for summary in get_safe(work, "work-summary", []):
            names = contributors_by_put_code.get(str(get_safe(summary, "put-code", "")))
            if names:
                source["orcid_authors"] = names
                break
        # --- 추가 끝 ---

        # copy fields from entry to source
        source.update(entry)

        # add source to list
        sources.append(source)

    return sources
