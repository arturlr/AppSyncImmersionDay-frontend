import { useState, useEffect } from "react";
import { API, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { createBook } from '../graphql/mutations';

import { validateField } from "../utils/formUtils";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Grid from "@cloudscape-design/components/grid";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import TextArea from "@cloudscape-design/components/textarea";
import TokenGroup from "@cloudscape-design/components/token-group";

function CreateBookForm(props) {
    const {
        isVisible,
        clearOnSuccess = true,
        onSuccess,
        onError
    } = props;
    const initialValues = {
        title: "",
        authorId: "",
        description: "",
        publisherId: "",
        publicationYear: 0,
        genres: [],
        genre: "",
        image: "",
        errors: {}
    };

    const [title, setTitle] = useState(initialValues.title);
    const [authorId, setAuthorId] = useState(initialValues.authorId);
    const [description, setDescription] = useState(initialValues.description);
    const [publisherId, setPublisherId] = useState(initialValues.publisherId);
    const [publicationYear, setPublicationYear] = useState(initialValues.publicationYear);
    const [genres, setGenres] = useState(initialValues.genres);
    const [genre, setGenre] = useState(initialValues.genre);
    const [image, setImage] = useState(initialValues.image);
    const [errors, setErrors] = useState(initialValues.errors);

    const resetStateValues = () => {
        setTitle(initialValues.title);
        setAuthorId(initialValues.authorId);
        setDescription(initialValues.description);
        setPublisherId(initialValues.publisherId);
        setPublicationYear(initialValues.publicationYear);
        setGenres(initialValues.genres);
        setGenre(initialValues.genre);
        setImage(initialValues.image);
        setErrors(initialValues.errors);
    };

    const validations = {
        title: [{ type: "Required" }],
        authorId: [{ type: "Required" }],
        description: [],
        publisherId: [{ type: "Required" }],
        publicationYear: [{ type: "BetweenInclusive", numValues: [0, new Date().getFullYear()]}],
        genres: [{ type: "LessThanEqualToNum", numValues: [5]}],
        genre: [],
        image: [{ type: "URL" }],
    };

    const runValidationTasks = async (
        fieldName,
        currentValue,
        getDisplayValue
    ) => {
        const value =
            currentValue && getDisplayValue
                ? getDisplayValue(currentValue)
                : currentValue;
        let validationResponse = validateField(value, validations[fieldName]);
        setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
        return validationResponse;
    };

    async function handleFormSubmit(event) {
        event.preventDefault();
        let modelFields = {
            title,
            authorId,
            description,
            publisherId,
            publicationYear,
            genres,
            image
        };

        const validationResponses = await Promise.all(
            Object.keys(validations).reduce((promises, fieldName) => {
                if (Array.isArray(modelFields[fieldName]) && fieldName !== "genres") {
                    promises.push(
                        ...modelFields[fieldName].map((item) => {
                            runValidationTasks(fieldName, item)
                        })
                    );
                    return promises;
                }
                if (fieldName === "genres") {
                    promises.push(
                        runValidationTasks(fieldName, modelFields[fieldName].length)
                    );
                } else {
                    promises.push(
                        runValidationTasks(fieldName, modelFields[fieldName])
                    );
                }
                return promises;
            }, [])
        );

        if (validationResponses.some((r) => r.hasError)) {
            return;
        };

        try {
            Object.entries(modelFields).forEach(([key, value]) => {
                if (typeof value === "string" && value.trim() === "") {
                    modelFields[key] = undefined;
                }
            });

            const modelFieldsToSave = {
                title: modelFields.title,
                authorId: modelFields.authorId,
                description: modelFields.description,
                publisherId: modelFields.publisherId,
                publicationYear: modelFields.publicationYear,
                genres: modelFields.genres.map(g => g.label),
                image: modelFields.image
            };
            
            // Add in API call here
            const res = await API.graphql({
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                query: createBook,
                variables: {
                    input: modelFieldsToSave
                }
            });

            if (onSuccess) {
                onSuccess(res.data.createBook);
            }
            if (clearOnSuccess) {
                resetStateValues();
            }
        } catch (err) {
            if (onError) {
                onError(err.message);
            }
        }
    };

    const handleFormCancel = (event) => {
        event.preventDefault();
        resetStateValues();
    };

    useEffect(() => {
        if (!isVisible) {
            resetStateValues();
        }
    }, [isVisible])

    return (
        <form onSubmit={(e) => handleFormSubmit(e)}>
            <Form
                actions={
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button formAction="none" onClick={handleFormCancel}>Cancel</Button>
                        <Button formAction="submit" variant="primary">Add book</Button>
                    </SpaceBetween>
                }
            >
                <Container>
                    <SpaceBetween direction="vertical" size="l">
                        <FormField label="Title"
                            errorText={errors.title?.hasError ? errors.title?.errorMessage : ""}
                        >
                            <Input 
                                name="title"
                                inputMode="text"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    let { value } = e.detail;
                                    if (errors.title?.hasError) {
                                        runValidationTasks("title", title);
                                    }
                                    setTitle(value);
                                }}
                                onBlur={() => runValidationTasks("title", title)}
                            />
                        </FormField>
                        <FormField label={<span>Description <i>- optional</i>{" "}</span>}
                            errorText={errors.description?.hasError ? errors.description?.errorMessage : ""}
                        >
                            <TextArea 
                                name="description"
                                spellcheck={true}
                                value={description}
                                onChange={(e) => {
                                    e.preventDefault();
                                    let { value } = e.detail;
                                    if (errors.description?.hasError) {
                                        runValidationTasks("description", description);
                                    }
                                    setDescription(value);
                                }}
                                onBlur={() => runValidationTasks("description", description)}
                            />
                        </FormField>
                        <FormField label="Author ID"
                            errorText={errors.authorId?.hasError ? errors.authorId?.errorMessage : ""}
                        >
                            <Input 
                                name="authorId"
                                inputMode="text"
                                type="text"
                                value={authorId}
                                onChange={(e) => {
                                    let { value } = e.detail;
                                    if (errors.authorId?.hasError) {
                                        runValidationTasks("authorId", authorId);
                                    }
                                    setAuthorId(value);
                                }}
                                onBlur={() => runValidationTasks("authorId", authorId)}
                            />
                        </FormField>
                        <FormField label="Publisher ID"
                            errorText={errors.publisherId?.hasError ? errors.publisherId?.errorMessage : ""}
                        >
                            <Input 
                                name="publisherId"
                                inputMode="text"
                                type="text"
                                value={publisherId}
                                onChange={(e) => {
                                    let { value } = e.detail;
                                    if (errors.publisherId?.hasError) {
                                        runValidationTasks("publisherId", publisherId);
                                    }
                                    setPublisherId(value);
                                }}
                                onBlur={() => runValidationTasks("publisherId", publisherId)}
                            />
                        </FormField>
                        <FormField label={<span>Publication Year <i>- optional</i>{" "}</span>}
                            errorText={errors.publicationYear?.hasError ? errors.publicationYear.errorMessage : ""}
                        >
                            <Input 
                                name="publicationYear"
                                inputMode="numeric"
                                type="number"
                                value={publicationYear}
                                onChange={(e) => {
                                    let { value } = e.detail;
                                    if (errors.publicationYear?.hasError) {
                                        runValidationTasks("publicationYear", publicationYear);
                                    }
                                    setPublicationYear(value);
                                }}
                                onBlur={() => runValidationTasks("publicationYear", publicationYear)}
                            />
                        </FormField>
                        <FormField label={<span>Image URL <i>- optional</i>{" "}</span>}
                            errorText={errors.image?.hasError ? errors.image?.errorMessage : ""}
                        >
                            <Input 
                                name="image"
                                inputMode="url"
                                type="url"
                                value={image}
                                onChange={(e) => {
                                    let { value } = e.detail;
                                    if (errors.image?.hasError) {
                                        runValidationTasks("image", image);
                                    }
                                    setImage(value);
                                }}
                                onBlur={() => runValidationTasks("image", image)}
                            />
                        </FormField>
                        <FormField label={<span>Genres <i>- optional</i>{" "}</span>}
                            errorText={errors.genres?.hasError ? "Max number of genres added" : ""}
                        >
                            <Grid gridDefinition={[{colspan: 8}, {colspan: 4}]}>
                                <Input 
                                name="genre"
                                inputMode="text"
                                type="text"
                                value={genre}
                                onChange={(e) => {
                                    let { value } = e.detail;
                                    if (errors.genre?.hasError || errors.genres?.hasError) {
                                        runValidationTasks("genre", genre);
                                        runValidationTasks("genres", genres.length);
                                    }
                                    setGenre(value);
                                }}
                                onBlur={() => {
                                    runValidationTasks("genre", genre);
                                    runValidationTasks("genres", genres.length);
                                }}
                                />
                                <Button
                                    formAction="none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        runValidationTasks("genres", genres.length + 1);
                                        if (genres.length + 1 <= 5) {
                                            setGenres(prev => {
                                                return [...prev, {label: genre, dismissLabel: `Remove ${genre}`}]
                                            });
                                            setGenre("");
                                        }
                                    }}
                                >Add genre</Button>
                            </Grid>
                            <TokenGroup 
                                onDismiss={({ detail: { itemIndex } }) => {
                                    setGenres([
                                        ...genres.slice(0, itemIndex),
                                        ...genres.slice(itemIndex + 1)
                                    ]);
                                    runValidationTasks("genres", genres.length);
                                }}
                                items={genres}
                                limit={5}
                            />
                        </FormField>
                    </SpaceBetween>
                </Container>
            </Form>
        </form>
    );
};

export default CreateBookForm;