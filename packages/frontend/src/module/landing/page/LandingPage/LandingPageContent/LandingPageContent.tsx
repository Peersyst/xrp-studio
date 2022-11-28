import { Col, Divider, WithLoading } from "@peersyst/react-components";
import { usePaginatedList } from "@peersyst/react-hooks";
import { LandingPageProps } from "module/landing/Landing.types";
import { useGetCollectionNfts } from "module/nft/query/useGetCollectionNfts";
import LandingPageArtistsSection from "../LandingPageArtistsSection/LandingPageArtistsSection";
import LandingPageHowWorkSection from "../LandingPageHowWorkSection/LandingPageHowWorkSection";
import LandingPageNftsSection from "../LandingPageNftsSection/LandingPageNftsSection";
import LandingPagePartnersSection from "../LandingPagePartnersSection/LandingPagePartnersSection";

function LandingPageContent({ ...rest }: WithLoading<LandingPageProps>): JSX.Element {
    //TODO : getLandingNfts
    const { data: paginatedNfts, isLoading: loadingNfts } = useGetCollectionNfts(3);
    const nfts = usePaginatedList(paginatedNfts?.pages, (page) => page.items);
    //TODO : getArtists
    const artist = [
        {
            id: 1,
            image: "https://s3-alpha-sig.figma.com/img/8fa9/dff7/67aa4e06bbdc7f0e3089e4751b304df6?Expires=1670198400&Signature=HkCA9ODRIfvYg1AAbb5Ohfq4ThsN34VJVI1x~6C5dsBv0sL7X26Ev3PtTwo9DeVgx7ds5flNistiyrhGFxE3IhvJ11joBDwPJbZg3OAsBqoNKf9hZDkpuV72LDFeQCfWa6i793ae1Addet5QHNwMHGUezm~CXXayLHndKAIXINVXO4nWC5yTUSmt9nab-VaZKVwpipNnZUaIwFCZurDGV7u0~0JoCRA20vSVmcchU~vT0UVFmNMB353v~Ls-uL5a1DBL6ZeZMg4BodceZs0PDjBoaI5PguFesLq7Wb4kciL1wxRXtVNLKGTtfxD-rFMQAiXeEDFH-Vu6rQY~6ycC6A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            name: "@rickstar",
            address: "",
        },
        {
            id: 2,
            image: "https://s3-alpha-sig.figma.com/img/636e/ce41/65a857b5f37bfb6b16baf720bd2699a4?Expires=1670198400&Signature=RHLWxBkXiAE9A-Gna0CPqgi4ejSGKXi~L5WXqaQy84XK5i-GxUfR0tSPu69tztSs7mrX7LCHGjl-TIY-rhtgb2czMNw-KOeOHdWL7MGOWb5xfYgn3dYD9Z-NDmHC1MKJOK6iXws3Ccdp8ev~76mm7TRBvnLH0~k6koSUgg2WKehKpPgjUCtNzURtGQGWRn562WI0gYeszkfHhuIjQwkKvdeIzhlPSSbOE6v30Jrlsp2aGv3P7CqDuY6KtaAX~LDFfYlZX90Kd2UFONIpEBBmjkxZSk6uWXUAbaANsqmGEhyJ983VIujNfSZMxMYo1n9k2w4qlXlNO51SXIQr3IWvzg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            name: "@pepe",
            address: "",
        },
        {
            id: 3,
            image: "https://s3-alpha-sig.figma.com/img/1a0f/c48e/a2c0c8534458c288393faa1553e7f93e?Expires=1670198400&Signature=ZQ3sNueoHzmSNUVbNR0OQP~y2J6YtuyJeJY0UJQtxWJ4HkpsFxDP0Ol~rP~YHegaNj2VzUNkft0kXQBm~Nxv0rHBj~WKiuyn4lNuBkbz~Z9nvfmX3Zmk1HEy6O-jMi2yfRzuAS-c5MY77VkYT~4OdcZkc1rOkCG8BHBoVULNi3ZiSwps1kFacPHxImlGOej5souz8yA2yiOgcd4Tmnr0f9zqKQ5DTbBCAFqAUp9U9ElOk0rpysOR2MLMfSFPAAfeWVZnYwhpdt-KKnN6EzKSb2AO9iPIt740Jms5-XWx0jV1F4IHARKe68EMbcZ0AzB3Xtg3nNRtxy9Wk~pGRcgOWQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            name: "@vicent",
            address: "",
        },
        {
            id: 1,
            image: "https://s3-alpha-sig.figma.com/img/8fa9/dff7/67aa4e06bbdc7f0e3089e4751b304df6?Expires=1670198400&Signature=HkCA9ODRIfvYg1AAbb5Ohfq4ThsN34VJVI1x~6C5dsBv0sL7X26Ev3PtTwo9DeVgx7ds5flNistiyrhGFxE3IhvJ11joBDwPJbZg3OAsBqoNKf9hZDkpuV72LDFeQCfWa6i793ae1Addet5QHNwMHGUezm~CXXayLHndKAIXINVXO4nWC5yTUSmt9nab-VaZKVwpipNnZUaIwFCZurDGV7u0~0JoCRA20vSVmcchU~vT0UVFmNMB353v~Ls-uL5a1DBL6ZeZMg4BodceZs0PDjBoaI5PguFesLq7Wb4kciL1wxRXtVNLKGTtfxD-rFMQAiXeEDFH-Vu6rQY~6ycC6A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            name: "@rickstar",
            address: "",
        },
        {
            id: 2,
            image: "https://s3-alpha-sig.figma.com/img/636e/ce41/65a857b5f37bfb6b16baf720bd2699a4?Expires=1670198400&Signature=RHLWxBkXiAE9A-Gna0CPqgi4ejSGKXi~L5WXqaQy84XK5i-GxUfR0tSPu69tztSs7mrX7LCHGjl-TIY-rhtgb2czMNw-KOeOHdWL7MGOWb5xfYgn3dYD9Z-NDmHC1MKJOK6iXws3Ccdp8ev~76mm7TRBvnLH0~k6koSUgg2WKehKpPgjUCtNzURtGQGWRn562WI0gYeszkfHhuIjQwkKvdeIzhlPSSbOE6v30Jrlsp2aGv3P7CqDuY6KtaAX~LDFfYlZX90Kd2UFONIpEBBmjkxZSk6uWXUAbaANsqmGEhyJ983VIujNfSZMxMYo1n9k2w4qlXlNO51SXIQr3IWvzg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            name: "@pepe",
            address: "",
        },
        {
            id: 3,
            image: "https://s3-alpha-sig.figma.com/img/1a0f/c48e/a2c0c8534458c288393faa1553e7f93e?Expires=1670198400&Signature=ZQ3sNueoHzmSNUVbNR0OQP~y2J6YtuyJeJY0UJQtxWJ4HkpsFxDP0Ol~rP~YHegaNj2VzUNkft0kXQBm~Nxv0rHBj~WKiuyn4lNuBkbz~Z9nvfmX3Zmk1HEy6O-jMi2yfRzuAS-c5MY77VkYT~4OdcZkc1rOkCG8BHBoVULNi3ZiSwps1kFacPHxImlGOej5souz8yA2yiOgcd4Tmnr0f9zqKQ5DTbBCAFqAUp9U9ElOk0rpysOR2MLMfSFPAAfeWVZnYwhpdt-KKnN6EzKSb2AO9iPIt740Jms5-XWx0jV1F4IHARKe68EMbcZ0AzB3Xtg3nNRtxy9Wk~pGRcgOWQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            name: "@vicent",
            address: "",
        },
    ];
    // TODO : get How Work
    const items = [
        {
            image: "https://s3-alpha-sig.figma.com/img/e291/17c0/18ec079794dc535c91e5c04effbd56fd?Expires=1670198400&Signature=P-h-vlj3PMvizoeIy4d8b4KWnPqhuZ25eZqs~jkDz71abYogdS3RTD9lDSD9zl-tCscijLRsDtTyPT-XtFh4EU2HMclM2V~kAFOqHuVERP9T5fHvaSqxxvfkzSVam15kuw~FGPWc1my4uj5dT47xljrUdCtZCAcUyBekYOyTtPd2kUn8zDT4GUeHIQH7LQRvRVGVRUqGrZ65ihnC8vZqllzuAqMHskJSz3NvbDaK2oK2UCZe9blCn1hzAOiLC4k11J0s-fyEUH1peh8RC5eNgSxVzyEnhRz5Hho72D0CTwXiqFZRouBbl8~FTmmVx6oM4mEXK504B2UpdfMdN7czGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            title: "Create NFTs and manage your digital gallery",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac nibh vitae orci scelerisque laoreet. Pellentesque convallis, odio nec interdum viverra, arcu quam elementum leo, sed mollis tellus magna at magna. Vivamus ornare pharetra ullamcorper. In in congue felis. Ut elementum luctus turpis ac cursus.",
        },
        {
            image: "https://s3-alpha-sig.figma.com/img/e291/17c0/18ec079794dc535c91e5c04effbd56fd?Expires=1670198400&Signature=P-h-vlj3PMvizoeIy4d8b4KWnPqhuZ25eZqs~jkDz71abYogdS3RTD9lDSD9zl-tCscijLRsDtTyPT-XtFh4EU2HMclM2V~kAFOqHuVERP9T5fHvaSqxxvfkzSVam15kuw~FGPWc1my4uj5dT47xljrUdCtZCAcUyBekYOyTtPd2kUn8zDT4GUeHIQH7LQRvRVGVRUqGrZ65ihnC8vZqllzuAqMHskJSz3NvbDaK2oK2UCZe9blCn1hzAOiLC4k11J0s-fyEUH1peh8RC5eNgSxVzyEnhRz5Hho72D0CTwXiqFZRouBbl8~FTmmVx6oM4mEXK504B2UpdfMdN7czGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            title: "Create NFTs and manage your digital gallery",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac nibh vitae orci scelerisque laoreet. Pellentesque convallis, odio nec interdum viverra, arcu quam elementum leo, sed mollis tellus magna at magna. Vivamus ornare pharetra ullamcorper. In in congue felis. Ut elementum luctus turpis ac cursus.",
        },
        {
            image: "https://s3-alpha-sig.figma.com/img/e291/17c0/18ec079794dc535c91e5c04effbd56fd?Expires=1670198400&Signature=P-h-vlj3PMvizoeIy4d8b4KWnPqhuZ25eZqs~jkDz71abYogdS3RTD9lDSD9zl-tCscijLRsDtTyPT-XtFh4EU2HMclM2V~kAFOqHuVERP9T5fHvaSqxxvfkzSVam15kuw~FGPWc1my4uj5dT47xljrUdCtZCAcUyBekYOyTtPd2kUn8zDT4GUeHIQH7LQRvRVGVRUqGrZ65ihnC8vZqllzuAqMHskJSz3NvbDaK2oK2UCZe9blCn1hzAOiLC4k11J0s-fyEUH1peh8RC5eNgSxVzyEnhRz5Hho72D0CTwXiqFZRouBbl8~FTmmVx6oM4mEXK504B2UpdfMdN7czGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            title: "Create NFTs and manage your digital gallery",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac nibh vitae orci scelerisque laoreet. Pellentesque convallis, odio nec interdum viverra, arcu quam elementum leo, sed mollis tellus magna at magna. Vivamus ornare pharetra ullamcorper. In in congue felis. Ut elementum luctus turpis ac cursus.",
        },
    ];

    return (
        <Col {...rest}>
            <Col gap={"5.5rem"}>
                <Divider />
                <LandingPageNftsSection nfts={nfts} loading={loadingNfts} />
                <LandingPageArtistsSection artists={artist} loading={loadingNfts} />
                <Col>
                    <Divider />
                    <LandingPageHowWorkSection items={items} />
                    <Divider />
                </Col>
                <LandingPagePartnersSection />
                <Divider />
            </Col>
        </Col>
    );
}

export default LandingPageContent;
