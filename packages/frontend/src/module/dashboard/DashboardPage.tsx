import { Col } from "@peersyst/react-components";
import AvatarInput from "module/common/component/input/AvatarInput/AvatarInput";
import ImageInput from "module/common/component/input/ImageInput/ImageInput";
import CoverInput from "module/common/component/input/CoverInput/CoverInput";
import Avatar from "module/common/component/display/Avatar/Avatar";

export default function DashboardPage(): JSX.Element {
    return (
        <Col gap={20} style={{ marginTop: 100 }} alignItems="center">
            <ImageInput
                alt=""
                css={{ height: 400, width: 400 }}
                value="https://s3-alpha-sig.figma.com/img/fa04/7fe7/fbc1a7233ff3dbdc2ceff5f386755445?Expires=1667779200&Signature=B1POLA6hEv7s6p8ZwfsTmyzmmg3wlnZd7TpNvFar2SK~bfJZON2uXyekVoU3WscTbHaxc7Lh0cvgwTYctlx24r33eeaPMosUBiQPoGNeou6sYFYN7nk1Tl7BEtlOIs9c1LYr9QwHbaltE0D8sFDB9i2y2E7mXG0ZqXvlk8ImSWVxbobzrPxG6dR~VD~MYngF3-QyEII~HhgnxTTXJkusrbQrsB1lC39yfAxNkBHv12AAsFmOvhByEP9kzFDkjFrtl~pvZl7RtRli9-MmTa7fN831WAkqQ3eWdKBnjayF7-0o9LqxHZ5E7HNUH1e5uX~sJP4vIMxEKiTfHFeFCnNdFw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            />
            <CoverInput
                alt=""
                css={{ height: 200, width: 400 }}
                value="https://s3-alpha-sig.figma.com/img/fa04/7fe7/fbc1a7233ff3dbdc2ceff5f386755445?Expires=1667779200&Signature=B1POLA6hEv7s6p8ZwfsTmyzmmg3wlnZd7TpNvFar2SK~bfJZON2uXyekVoU3WscTbHaxc7Lh0cvgwTYctlx24r33eeaPMosUBiQPoGNeou6sYFYN7nk1Tl7BEtlOIs9c1LYr9QwHbaltE0D8sFDB9i2y2E7mXG0ZqXvlk8ImSWVxbobzrPxG6dR~VD~MYngF3-QyEII~HhgnxTTXJkusrbQrsB1lC39yfAxNkBHv12AAsFmOvhByEP9kzFDkjFrtl~pvZl7RtRli9-MmTa7fN831WAkqQ3eWdKBnjayF7-0o9LqxHZ5E7HNUH1e5uX~sJP4vIMxEKiTfHFeFCnNdFw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            />
            <AvatarInput alt="" />
            <Avatar img="https://ca.slack-edge.com/T01UF3E38CT-U02VBM8DBRA-7e1edb43c126-512" alt="" />
        </Col>
    );
}
