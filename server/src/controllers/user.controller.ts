import { Request, Response } from "express";
import { UserResponse } from "../models/userResponse.model";
import { User } from "../models/user.model"
import { Paging } from "../models/paging.model"
import logger from "../config/logging"
const userService = require("../services/user.service");

const getUsers = (req: Request, res: Response) => {
    try {

        const fullURL = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        logger.info("Request: " + fullURL.toString());

        const page = parseInt((req.query.page ?? 1) as string, 10);
        const size = parseInt((req.query.size ?? 10) as string, 10);

        if (isNaN(page) || page < 1) {
            return res.status(400).json({ message: 'Invalid page number' });
        }
        if (isNaN(size) || size < 1) {
            return res.status(400).json({ message: 'Invalid size' });
        }
        if (req.query.order && !(req.query.order === 'asc' || req.query.order === 'desc')) {
            return res.status(400).json({ message: 'Invalid order' });
        }

        logger.info(fullURL.toString() + " Fetching data");
        let response: UserResponse = {} as UserResponse;
        response.data = userService.getUsers(size, page, req.query.sort, req.query.order);

        if (response.data.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        logger.info(fullURL.toString() + " Adding metadata");
        let pagingData: Paging = {} as Paging;
        pagingData.page = page;
        pagingData.size = size;
        pagingData.totalResults = userService.userCount();
        pagingData.maxPages = Math.ceil(pagingData.totalResults / pagingData.size);

        if (page > 1) {
            pagingData.previous = req.originalUrl.replace('page=' + page, 'page=' + (page - 1));
        }

        if (page < pagingData.maxPages) {
            if (req.query.page) {
                pagingData.next = req.originalUrl.replace('page=' + page, 'page=' + (page + 1));
            } else {
                let nextURL = fullURL;
                nextURL.searchParams.set('page', '2');
                pagingData.next = nextURL.pathname + nextURL.search + nextURL.hash;
            }         
        }

        response.paging = pagingData;

        logger.info("Response: " + response);
        res.status(200).json(response);

    } catch (error) {
        logger.error('Error in getUsers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUser = (req: Request, res: Response) => {
    try {
        
        res.status(200).json(userService.getUser(req.params.id));

    } catch (error) {
        logger.error('Error in getUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUsers,
    getUser
}
