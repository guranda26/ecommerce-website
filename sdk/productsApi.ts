import { clientMaker } from './createClient';




export const getProductsByName = async (str: string) => {
    const apiRoot = clientMaker();
    try {
        const response = await apiRoot
            .productProjections()
            .search()
            .get({
                queryArgs: {
                    limit: 500
                }
            })
            .execute()
            .then((products) => {
                return products.body.results.filter((product) => product.name['en-US'].toLowerCase().includes(str.toLowerCase()));
            }).then((res) => res);
        console.log("response:::", response);
        return response;

    } catch (error) {
        console.error('Error fetching product :', error);
        throw error;
    }
}
