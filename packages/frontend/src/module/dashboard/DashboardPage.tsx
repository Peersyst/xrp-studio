import { Col } from "@peersyst/react-components";
import DropLanding from "module/drop/component/display/DropLanding/DropLanding";

export default function DashboardPage(): JSX.Element {
    return (
        <Col gap={20} flex={1} style={{ marginTop: 100, width: "100%" }} alignItems="center">
            <DropLanding
                drop={{
                    id: 1,
                    price: "100",
                    backgroundColor: "#000000",
                    fontColor: "#FFFFFF",
                    faqs: [],
                    collection: {
                        id: 1,
                        taxon: 1,
                        items: 100,
                        name: "Peaky Wolves Collection",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan tristique porta. Mauris pharetra pharetra enim. Morbi semper tristique ligula, in fringilla nisl egestas sed. Proin molestie ullamcorper tortor, vitae tincidunt sapien scelerisque vel. Pellentesque a diam eu lectus commodo interdum vehicula eu justo. Duis rutrum dolor non lacus suscipit, eget luctus odio lobortis. Ut vitae cursus augue. Morbi viverra ut odio eu facilisis.",
                        image: "https://s3-alpha-sig.figma.com/img/f01d/3395/8ad0be6041e9d52fbb127bc452e13884?Expires=1669593600&Signature=TNn-jCcA8comU-WGuyACWsidiA2RKeARzf5hdo7s13lpIcohGwKK2AW9QoYqClOksnpVtjz~EYB62b7Yxywx4nK7L4zt4yGNmHA7hzJN5aRr6B5-fv6EoTy3JQV390-cNJb4FCvJXt7NuBpeEb1bNnD8r4gJmGvBsUm7WbkfZ8M5Dk-t1zAFMwbQQBSOb6~prQmcmvB8ZEbUa1wFHdZEjp3pisESz~nvhUxNPrWw4lzPzrb9WCmsYI5ZlE5UWajGlgMucHa-gLRWf51p5FJIsSLpH459qf1IMvUPrqH2LRYWcCga2iqsIDNEjKrFWsrblW0cjBUYARJ-sob-U0-x2A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                        header: "https://s3-alpha-sig.figma.com/img/f01d/3395/8ad0be6041e9d52fbb127bc452e13884?Expires=1669593600&Signature=TNn-jCcA8comU-WGuyACWsidiA2RKeARzf5hdo7s13lpIcohGwKK2AW9QoYqClOksnpVtjz~EYB62b7Yxywx4nK7L4zt4yGNmHA7hzJN5aRr6B5-fv6EoTy3JQV390-cNJb4FCvJXt7NuBpeEb1bNnD8r4gJmGvBsUm7WbkfZ8M5Dk-t1zAFMwbQQBSOb6~prQmcmvB8ZEbUa1wFHdZEjp3pisESz~nvhUxNPrWw4lzPzrb9WCmsYI5ZlE5UWajGlgMucHa-gLRWf51p5FJIsSLpH459qf1IMvUPrqH2LRYWcCga2iqsIDNEjKrFWsrblW0cjBUYARJ-sob-U0-x2A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                        user: { address: "address" },
                    },
                }}
            />
        </Col>
    );
}
