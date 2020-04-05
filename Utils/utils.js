const paginateData = (data, page, pageSize) => {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const start = pageSize * (page-1);
    const end = start  + pageSize;
    return data.slice(start, end);
}

module.exports = {
    paginateData,
}