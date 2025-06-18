import logger from "../config/logging";
import { User } from "../models/user.model";
import { genCompare } from "../util/comparators";

const usersData = require('../data/user.data.json') as User[];

const getUsers = (size: number, page: number, sort: keyof User = 'id', order: 'asc' | 'desc' = 'asc') : User[] => {

    logger.info("UserService fetching page: " + page + " with size: " + size + "sorting by: " + sort);
    let users = usersData.sort((a, b) => genCompare(a[sort], b[sort], order));

    users = users.slice(size * (page - 1), size * page);

    return users;
}

const getUser = (id: number) : User => {

    logger.info("UserService fetching user: " + id);
    return usersData.find(user => user.id === id);
}

const userCount = () => {

    logger.info("UserService fetching user count");
    return usersData.length;
}

module.exports = {
    getUsers,
    getUser,
    userCount
}