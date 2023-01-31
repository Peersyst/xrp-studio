import {
    CollectionCreationAction,
    CollectionCreationPageScaffoldProps,
} from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationPageScaffold.types";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Form } from "@peersyst/react-components";
import CollectionCreationContent from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationContent/CollectionCreationContent";
import { CollectionCreationContentProps } from "module/collection/component/layout/CollectionCreationPageScaffold/CollectionCreationContent/CollectionCreationContent.types";
import ActionsPageHeader from "module/common/component/layout/ActionsPageHeader/ActionsPageHeader";
import { CollectionCreationForm } from "module/collection/types";

function CollectionCreationPageScaffold<D extends boolean = false>({
    loading = false,
    onSubmit,
    title,
    backPath,
    actions,
    ...collectionCreationContentProps
}: CollectionCreationPageScaffoldProps<D>): JSX.Element {
    const handleSubmit = (data: CollectionCreationForm, action: string | undefined) => {
        if (action) return onSubmit(data, action as CollectionCreationAction);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <BasePage>
                {{
                    header: <ActionsPageHeader title={title} backPath={backPath} actions={actions} loading={loading} />,
                    // CollectionCreationContentProps generic type is not relevant here
                    content: (
                        <CollectionCreationContent
                            loading={loading}
                            {...(collectionCreationContentProps as CollectionCreationContentProps<any>)}
                        />
                    ),
                }}
            </BasePage>
        </Form>
    );
}

export default CollectionCreationPageScaffold;
