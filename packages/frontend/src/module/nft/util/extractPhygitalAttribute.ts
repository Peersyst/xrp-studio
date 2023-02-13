import { MetadataAttributeDto } from "module/api/service";

const PHYGITAL_NFT_TRAIT_TYPE = "Phygital Public Key";

export default function (attributes: MetadataAttributeDto[]): [MetadataAttributeDto[], string | undefined] {
    return attributes.reduce(
        (prev, attr) => {
            if (attr.traitType === PHYGITAL_NFT_TRAIT_TYPE) return [prev[0], attr.value];
            else return [[...prev[0], attr], prev[1]];
        },
        [[], undefined] as [MetadataAttributeDto[], string | undefined],
    );
}
