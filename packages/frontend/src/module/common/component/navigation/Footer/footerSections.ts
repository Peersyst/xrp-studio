import { config } from "config";
import { FooterSection } from "./Footer.types";

export const FOOTER_SECTIONS: FooterSection[] = [
    {
        title: "learnMore",
        items: [
            {
                label: "about",
                link: config.footerLinks.about,
            },
            {
                label: "blog",
                link: config.footerLinks.blog,
            },
        ],
    },
    {
        title: "getInvolved",
        items: [
            {
                label: "github",
                link: config.footerLinks.github,
            },
            {
                label: "twitter",
                link: config.footerLinks.twitter,
            },
        ],
    },
    {
        title: "connect",
        items: [
            {
                label: "support",
                link: config.footerLinks.support,
            },
            {
                label: "privacyPolicy",
                link: config.footerLinks.privacyPolicy,
            },
            {
                label: "madeWith",
                link: "",
            },
        ],
    },
];
