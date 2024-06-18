import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export const getProductsByCategory = async (id: string,apiRoot:ByProjectKeyRequestBuilder) => {
    
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

export const getByParentCategory = async (id: string,apiRoot:ByProjectKeyRequestBuilder) => {
    
    try {
        const response = await apiRoot
            .categories()
            .get({
                queryArgs: {
                    where: `parent(id="${id}")`

                }
            })
            .execute();
        return response;

    } catch (error) {
        console.error('Error fetching product :', error);
        throw error;
    }
}


export const getCategories = async (apiRoot:ByProjectKeyRequestBuilder) => {
    
    try {
        const response = await apiRoot
            .categories()
            .get({
                queryArgs: {
                    limit: 100,
                }
            })
            .execute();
        return response;
    } catch (error) {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(`Failed to get products: ${errorMessage}`);
    }
};


