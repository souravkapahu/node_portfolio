export function wrapAsync(fn: Function) {
    return async (data: any) => {
        try {
            return await fn(data);
        } catch (error) {
            // You can throw the error, or handle it accordingly here
            throw new Error(error.message || 'An unknown error occurred');
        }
    };
}