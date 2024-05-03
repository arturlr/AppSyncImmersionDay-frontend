import { useState, useEffect, useRef } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';

import { AUTHOR_CARD_DEFINITIONS } from '../config/card-config';
import { AUTHOR_FILTERING_PROPERTIES } from '../config/filter-properties';
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

function Authors() {
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState([]);
    const { items, actions, filteredItemsCount, collectionProps, propertyFilterProps, paginationProps } = useCollection(
        authors,
        {
            propertyFiltering: {
                filteringProperties: AUTHOR_FILTERING_PROPERTIES,
                empty: <TableEmptyState resourceName="Authors" />,
                noMatch: (
                    <TableNoMatchState
                        onClearFilter={() => {
                            actions.setPropertyFiltering({ tokens: [], operation: 'and' });
                        }}
                    />
                ),
            },
            pagination: { pageSize: 30 },
            selection: {}
        }
    );

    useEffect(() => {
        // this is where we will set the books using GQL calls
        setAuthors([]);
        setLoading(false);
    }, []);

    return (
        <Cards 
            {...collectionProps}
            stickyHeader={true}
            cardDefinition={AUTHOR_CARD_DEFINITIONS}

            loading={loading}
            loadingText="Loading authors"
            items={items}
            selectionType="multi"
            variant="full-page"
            ariaLabels={tableAriaLabels('Author')}
            renderAriaLive={renderAriaLive}
            header={
                <FullPageHeader 
                    title={"Authors"}
                    selectedItemsCount={collectionProps.selectedItems.length}
                    counter={!loading && getHeaderCounterText(authors, collectionProps.selectedItems)}
                />
            }
            filter={
                <PropertyFilter 
                    {...propertyFilterProps}
                    i18nStrings={propertyFilterI18nStrings('Find authors')}
                    countText={getTextFilterCounterText(filteredItemsCount)}
                    expandToViewport={true}
                />
            }
            pagination={<Pagination {...paginationProps} ariaLabels={paginationAriaLabels(paginationProps.pagesCount)} />}
        />
    );

};

export default function AuthorsView() {
  const appLayout = useRef();
  return (
    <CustomAppLayout
      ref={appLayout}
      activeHref={'/authors'}
      content={
        <Authors />
      }
      contentType="cards"
      stickyNotifications={true}
    />
  );
};