import { MetadataAttributeDto } from "module/api/service";

export default function (attributes: MetadataAttributeDto[]): [MetadataAttributeDto[], string | undefined] {
    return attributes.reduce(
        (prev, attr) => {
            if (attr.traitType === "Phygital Public Key") return [prev[0], attr.value];
            else return [[...prev[0], attr], prev[1]];
        },
        [[], undefined] as [MetadataAttributeDto[], string | undefined],
    );
}
