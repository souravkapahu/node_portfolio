export const dataWithPagination = (aggregateData: any, offset: number = 0, limit: number = 10, name: string = 'list') => {
    const totalCount = (aggregateData.length > 0 && aggregateData[0]?.totalCount) || 0

    let totalPages = Math.ceil(totalCount / limit);
    let currentPage = Math.floor(offset / limit);

    let prevPage = (currentPage - 1) > 0 ? (currentPage - 1) * limit : 0;
    let nextPage = (currentPage + 1) <= totalPages ? (currentPage + 1) * limit : 0;

    return {
        [name]: (aggregateData.length > 0 && aggregateData[0]?.data) || [],
        pagination: {
            totalCount,
            nextPage,
            prevPage,
            currentPage: currentPage + 1
        }
    }
}