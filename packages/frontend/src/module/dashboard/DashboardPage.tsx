import { Col } from "@peersyst/react-components";
import DropLanding from "module/drop/component/display/DropLanding/DropLanding";

export default function DashboardPage(): JSX.Element {
    return (
        <Col gap={20} flex={1} style={{ marginTop: 100, width: "100%" }} alignItems="center">
            <DropLanding
                drop={{
                    id: 1,
                    price: "100",
                    sold: 50,
                    backgroundColor: "#141A1F",
                    fontColor: "#FFFFFF",
                    faqs: [
                        { id: 1, question: "Question 1", answer: "Answer 1" },
                        { id: 2, question: "Question 2", answer: "Answer 2" },
                    ],
                    videoUrl: "https://www.youtube.com/watch?v=iPUmE-tne5U",
                    collection: {
                        id: 1,
                        taxon: 1,
                        items: 100,
                        name: "Peaky Wolves Collection",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan tristique porta. Mauris pharetra pharetra enim. Morbi semper tristique ligula, in fringilla nisl egestas sed. Proin molestie ullamcorper tortor, vitae tincidunt sapien scelerisque vel. Pellentesque a diam eu lectus commodo interdum vehicula eu justo. Duis rutrum dolor non lacus suscipit, eget luctus odio lobortis. Ut vitae cursus augue. Morbi viverra ut odio eu facilisis.",
                        image: "https://s3-alpha-sig.figma.com/img/f01d/3395/8ad0be6041e9d52fbb127bc452e13884?Expires=1669593600&Signature=TNn-jCcA8comU-WGuyACWsidiA2RKeARzf5hdo7s13lpIcohGwKK2AW9QoYqClOksnpVtjz~EYB62b7Yxywx4nK7L4zt4yGNmHA7hzJN5aRr6B5-fv6EoTy3JQV390-cNJb4FCvJXt7NuBpeEb1bNnD8r4gJmGvBsUm7WbkfZ8M5Dk-t1zAFMwbQQBSOb6~prQmcmvB8ZEbUa1wFHdZEjp3pisESz~nvhUxNPrWw4lzPzrb9WCmsYI5ZlE5UWajGlgMucHa-gLRWf51p5FJIsSLpH459qf1IMvUPrqH2LRYWcCga2iqsIDNEjKrFWsrblW0cjBUYARJ-sob-U0-x2A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                        header: "https://s3-alpha-sig.figma.com/img/f01d/3395/8ad0be6041e9d52fbb127bc452e13884?Expires=1669593600&Signature=TNn-jCcA8comU-WGuyACWsidiA2RKeARzf5hdo7s13lpIcohGwKK2AW9QoYqClOksnpVtjz~EYB62b7Yxywx4nK7L4zt4yGNmHA7hzJN5aRr6B5-fv6EoTy3JQV390-cNJb4FCvJXt7NuBpeEb1bNnD8r4gJmGvBsUm7WbkfZ8M5Dk-t1zAFMwbQQBSOb6~prQmcmvB8ZEbUa1wFHdZEjp3pisESz~nvhUxNPrWw4lzPzrb9WCmsYI5ZlE5UWajGlgMucHa-gLRWf51p5FJIsSLpH459qf1IMvUPrqH2LRYWcCga2iqsIDNEjKrFWsrblW0cjBUYARJ-sob-U0-x2A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                        user: {
                            address: "address",
                            name: "George Carabby",
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan tristique porta. Mauris pharetra pharetra enim. Morbi semper tristique ligula, in fringilla nisl egestas sed. Proin molestie ullamcorper tortor.",
                            image: "https://s3-alpha-sig.figma.com/img/8fa9/dff7/67aa4e06bbdc7f0e3089e4751b304df6?Expires=1669593600&Signature=TPGe7nx74qqg-KC-lK8-R6Od40Bl0Du6xSyQMv5pIdel~P-Qt8YaYJ~sbrRIeFa0w5EPgaqwylzD8UtQ-5J~IAkwosEsd2N84UHNzsQ-BoCjr03veMjzDrsEWxcGS7xHWlViLzeS5UpIUeKCBMKJ3MCIZMfjTe8PgiWPxaD6LxQjOtGsS6VunwiDOGw5RWn2uCJn~sNQMBGKDlEreNcEuSXJQy~IQDO4gzDRyN7flxz3t6ODjF6csgyhvT-8BkvKSDmxcbpZdQ1bo8R7b5bTzIR2NqMa6SEy5biPl4Qk1uwoM8vctz2Jsvi-AMB358qbizHnom~RFoTU5YpuI9FsNA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                        },
                    },
                }}
                nfts={[...Array(10)].map((_, i) => ({
                    id: i,
                    tokenId: "",
                    mintTransactionHash: "",
                    issuer: "rsgi7ENscrVaXC44JE2m94XzKQrmAVX2gV",
                    transferFee: 10,
                    flags: 0,
                    status: "confirmed",
                    metadata: {
                        name: "NFT #" + (i + 1),
                        image: "https://s3-alpha-sig.figma.com/img/ccfe/b3ad/f8a317f65af6f76ceb0b2fc2a74fb3b3?Expires=1669593600&Signature=PqBrZFMnqbK4UKVRlMHJv~6DF-8YnCHZvnIDaaU9h6H82k75MgCdzbxDE-UaeQFmtTju6TLewwAH7D6YZod0mHHEqoy6YavUB0OPf0Nkd94gwAJhBH5ZZ-j-CRTyOZHEaJ7DHoyeilqG-HS8gZqVP8mgKp-rO8~3zdwpyuqG-StrAt38ql-7ved5sJ8M6jCEykTu4J01dcnNhRgruPlkb6gv-IGMm6uflmOKsETskNPy9sNohaHfQOD3IFz1cOOAna9HZlcr8YIfcrNPPHkvZ5aMc6Pr4pA6W5GtyAjrJ0ixb9Cgt0sAUGOJZUKEt-3azidXoYCh-lDIbuwniTDmOA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                    },
                    user: {
                        address: "address",
                        name: "George Carabby",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan tristique porta. Mauris pharetra pharetra enim. Morbi semper tristique ligula, in fringilla nisl egestas sed. Proin molestie ullamcorper tortor.",
                        image: "https://s3-alpha-sig.figma.com/img/8fa9/dff7/67aa4e06bbdc7f0e3089e4751b304df6?Expires=1669593600&Signature=TPGe7nx74qqg-KC-lK8-R6Od40Bl0Du6xSyQMv5pIdel~P-Qt8YaYJ~sbrRIeFa0w5EPgaqwylzD8UtQ-5J~IAkwosEsd2N84UHNzsQ-BoCjr03veMjzDrsEWxcGS7xHWlViLzeS5UpIUeKCBMKJ3MCIZMfjTe8PgiWPxaD6LxQjOtGsS6VunwiDOGw5RWn2uCJn~sNQMBGKDlEreNcEuSXJQy~IQDO4gzDRyN7flxz3t6ODjF6csgyhvT-8BkvKSDmxcbpZdQ1bo8R7b5bTzIR2NqMa6SEy5biPl4Qk1uwoM8vctz2Jsvi-AMB358qbizHnom~RFoTU5YpuI9FsNA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                    },
                    collection: {
                        id: 1,
                        taxon: 1,
                        items: 100,
                        name: "Peaky Wolves Collection",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan tristique porta. Mauris pharetra pharetra enim. Morbi semper tristique ligula, in fringilla nisl egestas sed. Proin molestie ullamcorper tortor, vitae tincidunt sapien scelerisque vel. Pellentesque a diam eu lectus commodo interdum vehicula eu justo. Duis rutrum dolor non lacus suscipit, eget luctus odio lobortis. Ut vitae cursus augue. Morbi viverra ut odio eu facilisis.",
                        image: "https://s3-alpha-sig.figma.com/img/f01d/3395/8ad0be6041e9d52fbb127bc452e13884?Expires=1669593600&Signature=TNn-jCcA8comU-WGuyACWsidiA2RKeARzf5hdo7s13lpIcohGwKK2AW9QoYqClOksnpVtjz~EYB62b7Yxywx4nK7L4zt4yGNmHA7hzJN5aRr6B5-fv6EoTy3JQV390-cNJb4FCvJXt7NuBpeEb1bNnD8r4gJmGvBsUm7WbkfZ8M5Dk-t1zAFMwbQQBSOb6~prQmcmvB8ZEbUa1wFHdZEjp3pisESz~nvhUxNPrWw4lzPzrb9WCmsYI5ZlE5UWajGlgMucHa-gLRWf51p5FJIsSLpH459qf1IMvUPrqH2LRYWcCga2iqsIDNEjKrFWsrblW0cjBUYARJ-sob-U0-x2A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                        header: "https://s3-alpha-sig.figma.com/img/f01d/3395/8ad0be6041e9d52fbb127bc452e13884?Expires=1669593600&Signature=TNn-jCcA8comU-WGuyACWsidiA2RKeARzf5hdo7s13lpIcohGwKK2AW9QoYqClOksnpVtjz~EYB62b7Yxywx4nK7L4zt4yGNmHA7hzJN5aRr6B5-fv6EoTy3JQV390-cNJb4FCvJXt7NuBpeEb1bNnD8r4gJmGvBsUm7WbkfZ8M5Dk-t1zAFMwbQQBSOb6~prQmcmvB8ZEbUa1wFHdZEjp3pisESz~nvhUxNPrWw4lzPzrb9WCmsYI5ZlE5UWajGlgMucHa-gLRWf51p5FJIsSLpH459qf1IMvUPrqH2LRYWcCga2iqsIDNEjKrFWsrblW0cjBUYARJ-sob-U0-x2A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                        user: {
                            address: "address",
                            name: "George Carabby",
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc accumsan tristique porta. Mauris pharetra pharetra enim. Morbi semper tristique ligula, in fringilla nisl egestas sed. Proin molestie ullamcorper tortor.",
                            image: "https://s3-alpha-sig.figma.com/img/8fa9/dff7/67aa4e06bbdc7f0e3089e4751b304df6?Expires=1669593600&Signature=TPGe7nx74qqg-KC-lK8-R6Od40Bl0Du6xSyQMv5pIdel~P-Qt8YaYJ~sbrRIeFa0w5EPgaqwylzD8UtQ-5J~IAkwosEsd2N84UHNzsQ-BoCjr03veMjzDrsEWxcGS7xHWlViLzeS5UpIUeKCBMKJ3MCIZMfjTe8PgiWPxaD6LxQjOtGsS6VunwiDOGw5RWn2uCJn~sNQMBGKDlEreNcEuSXJQy~IQDO4gzDRyN7flxz3t6ODjF6csgyhvT-8BkvKSDmxcbpZdQ1bo8R7b5bTzIR2NqMa6SEy5biPl4Qk1uwoM8vctz2Jsvi-AMB358qbizHnom~RFoTU5YpuI9FsNA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                        },
                    },
                }))}
            />
        </Col>
    );
}
