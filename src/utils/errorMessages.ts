export const errorMessages: { [key: string]: string } = {
    400: "The request was invalid or cannot be served. Please check your inputs and try again.",
    401: "You are not authorized to access this resource. Please login and try again.",
    404: "The requested resource could not be found. Please check the URL and try again.",
    500: "There was an error processing your request. Our team (it's only me, actually) has been notified and is working on a solution. Please try again later.",
    unknownError: "An unknown error occurred."
}