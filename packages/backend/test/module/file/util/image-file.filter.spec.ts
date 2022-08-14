import imageFileFilter from "../../../../src/modules/file/util/image-file.filter";
import { BusinessException } from "../../../../src/modules/common/exception/business.exception";
import { ErrorCode } from "../../../../src/modules/common/exception/error-codes";

describe("imageFileFilter", () => {
    test("Calls callback with null and true when mimetype is of type image", () => {
        const cb = jest.fn();
        imageFileFilter({}, { mimetype: "image/png" } as Express.Multer.File, cb);
        expect(cb).toHaveBeenCalledWith(null, true);
    });

    test("Calls callback with INVALID_IMAGE error and false when mimetype is not of type image", () => {
        const cb = jest.fn();
        imageFileFilter({}, { mimetype: "application/pdf" } as Express.Multer.File, cb);
        expect(cb).toHaveBeenCalledWith(new BusinessException(ErrorCode.INVALID_IMAGE), false);
    });
});
