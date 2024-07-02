const baseUrl = process.env.REACT_APP_API_URL;

export const API_URL = {
    base: baseUrl,

    default: {
        file: "app/file"
    },

    Blog: {
        get: "article",
        list: "article/list",
        update: "article/update",
        create: "article/create",
        delete: "article/delete",
    },

};
