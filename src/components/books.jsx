import { useState, useEffect, useRef, useReducer } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { API } from '@aws-amplify/api';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { listBooks } from '../graphql/queries';
import { onCreateBook } from '../graphql/subscriptions';

import { BOOK_CARD_DEFINITIONS } from '../config/card-config';
import { BOOK_FILTERING_PROPERTIES } from '../config/filter-properties';
import { FullPageHeader } from './common/full-page-header';
import { TableNoMatchState, TableEmptyState, CustomAppLayout } from './common/common-components';
import { Cards, Pagination, PropertyFilter } from '@cloudscape-design/components';

import { 
    propertyFilterI18nStrings, 
    getTextFilterCounterText,
    paginationAriaLabels,
    tableAriaLabels,
    renderAriaLive,
    getHeaderCounterText
} from './common/i18n-strings';

function Books(props) {
    const { user } = useAuthenticator((context) => [context.user]);
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [nextToken, setNextToken] = useState(undefined);
    const { items, actions, filteredItemsCount, collectionProps, propertyFilterProps, paginationProps } = useCollection(
        books,
        {
            propertyFiltering: {
                filteringProperties: BOOK_FILTERING_PROPERTIES,
                empty: <TableEmptyState resourceName="Books" />,
                noMatch: (
                    <TableNoMatchState
                        onClearFilter={() => {
                            actions.setPropertyFiltering({ tokens: [], operation: 'and' });
                        }}
                    />
                ),
            },
            pagination: { pageSize: 32 },
            selection: {}
        }
    );

    // List books
    useEffect(() => {
        setLoading(false);
    }, []);

    const bookChangeReducer = (_, action) => {
        let localBooks = Object.create(books);
        switch (action.type) {
            case 'CREATE':
                setBooks([...localBooks, action.data]);
                break;
            default:
                break;
        }
    };
    const [_, dispatch] = useReducer(bookChangeReducer);

    function onCreateBookSub() {

    };

    // Subscribe to changes
    useEffect(() => {
        
    }, []);

    function generateFilterOptions() {
        const genres = propertyFilterProps.filteringOptions.filter(option => {
            return option.propertyKey === "genres";
        });

        const remaining = propertyFilterProps.filteringOptions.filter(option => {
            return option.propertyKey !== "genres";
        });

        const genreList = [];
        genres.forEach(option => {
            genreList.push(option.value.split(','));
        });

        remaining.push(genreList.flat().map(val => {
            return { propertyKey: "genres", value: val }
        }));

        return remaining.flat();
    };

    return (
        <Cards 
            {...collectionProps}
            stickyHeader={true}
            cardDefinition={BOOK_CARD_DEFINITIONS()}
            loading={loading}
            loadingText="Loading books"
            items={items}
            selectionType="multi"
            variant="full-page"
            ariaLabels={tableAriaLabels('Book')}
            renderAriaLive={renderAriaLive}
            header={
                <FullPageHeader 
                    selectedItemsCount={collectionProps.selectedItems.length}
                    counter={!loading && getHeaderCounterText(books, collectionProps.selectedItems)}
                    showAlert={props.showAlert}
                    alertStatus={props.alertStatus}
                    handler={props.handler}
                    createButtonText={"Add book"}
                    showActions={user !== undefined}
                />
            }
            filter={
                <PropertyFilter 
                    {...propertyFilterProps}
                    filteringOptions={generateFilterOptions()}
                    i18nStrings={propertyFilterI18nStrings('Find books')}
                    countText={getTextFilterCounterText(filteredItemsCount)}
                    expandToViewport={true}
                />
            }
            pagination={
                <Pagination 
                    {...paginationProps}
                    ariaLabels={paginationAriaLabels(paginationProps.pagesCount)} 
                />}
        />
    );

};

export default function BooksView(props) {
  const appLayout = useRef();
  return (
    <CustomAppLayout
      ref={appLayout}
      activeHref={'/books'}
      content={
        <Books {...props}/>
      }
      contentType="cards"
      stickyNotifications={true}
    />
  );
};