/**
 * Utility function to catch errors from a promise.
 * @template T
 * @param {Promise<T>|T} promise - The promise or value to execute.
 * @returns {Promise<[Error|undefined, T|undefined]>} - A promise that resolves to an array containing an error or result.
*

 * @example
 * const [error, result] = await to(somePromise());
 * if (error) {
 * console.error(error);
 * } else {
 * console.log(result);
 * }
*/

export async function to(promise) {
    return promise
        .then((result) => [undefined, result])
        .catch((error) => [error instanceof Error ? error : new Error(String(error)), null]);
}
