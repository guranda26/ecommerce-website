
import { clientMaker } from './createClient';

export const getProductsByCategory = async (id: string) => {
    const apiRoot = clientMaker();
    try {
        const response = await apiRoot
            .productProjections()
            .search()
            .get({
                queryArgs: {
                    limit: 117,
                    filter: `categories.id:subtree("${id}")`

                }
            })
            .execute();
        return response;

    } catch (error) {
        console.error('Error fetching product :', error);
        throw error;
    }
}
