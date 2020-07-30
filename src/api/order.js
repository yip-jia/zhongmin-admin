const orderAPI = {
    getUserList: {
        method: 'get',
        url: '/Account/GetUserList'
    },
    getTotalAll: {
        method: 'post',
        url: '/FinancialStatis/getTotalAll'
    },
    getFinanceCharts: {
        method: 'get',
        url: '/FinancialStatis/GetFinanceCharts'
    }
}

export default orderAPI