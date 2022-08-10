import React from "react";
import { Link } from "react-router-dom";
import { StoreLinkProps, StoreLinksType } from "./StoreLink.types";
import { config } from "config";

const storeLinks: StoreLinksType = {
    appStore: config.appStoreXummLink,
    playStore: config.playStoreXummLink,
};

const StoreLink = ({ type }: StoreLinkProps) => {
    return (
        <Link to={storeLinks[type]} target="_blank">
            StoreLink
        </Link>
    );
};

export default StoreLink;
