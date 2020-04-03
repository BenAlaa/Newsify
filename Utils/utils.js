const paginateData = (data, page, pageSize) => {
    const start = pageSize * (page-1);
    const end = start + pageSize
    return data.slice(start, end);
}

module.exports = {
    paginateData,
}