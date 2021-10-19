export enum Provider {
    database = 'DATABASE_CONNECTION',
    user = 'USER_REPOSITORY',
    product = 'PRODUCT_REPOSITORY',
    order = 'ORDER_REPOSITORY',
}

export enum Jwt {
    secret = "secret"
}

export enum Path {
    adminRegister = '/api/admin/register',
    adminLogin = '/api/admin/login',
    adminOrders = '/api/admin/orders',
}