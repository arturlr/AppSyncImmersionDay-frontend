export const appLayoutAriaLabels = {
    navigation: 'Side navigation',
    navigationToggle: 'Open side navigation',
    navigationClose: 'Close side navigation',
    notifications: 'Notifications',
    tools: 'Help panel',
    toolsToggle: 'Open help panel',
    toolsClose: 'Close help panel',
};

export const propertyFilterI18nStrings = (filterPlaceholder) => ({
    filteringAriaLabel: 'your choice',
    dismissAriaLabel: 'Dismiss',
    clearAriaLabel: 'Clear',

    filteringPlaceholder: filterPlaceholder,
    groupValuesText: 'Values',
    groupPropertiesText: 'Properties',
    operatorsText: 'Operators',

    operationAndText: 'and',
    operationOrText: 'or',

    operatorLessText: 'Less than',
    operatorLessOrEqualText: 'Less than or equal',
    operatorGreaterText: 'Greater than',
    operatorGreaterOrEqualText: 'Greater than or equal',
    operatorContainsText: 'Contains',
    operatorDoesNotContainText: 'Does not contain',
    operatorEqualsText: 'Equals',
    operatorDoesNotEqualText: 'Does not equal',

    editTokenHeader: 'Edit filter',
    propertyText: 'Property',
    operatorText: 'Operator',
    valueText: 'Value',
    cancelActionText: 'Cancel',
    applyActionText: 'Apply',
    allPropertiesLabel: 'All properties',

    tokenLimitShowMore: 'Show more',
    tokenLimitShowFewer: 'Show fewer',
    clearFiltersText: 'Clear filters',
    removeTokenButtonAriaLabel: token => `Remove token ${token.propertyKey} ${token.operator} ${token.value}`,
    enteredTextLabel: text => `Use: "${text}"`,
});

export const getTextFilterCounterServerSideText = (items = [], pagesCount, pageSize) => {
    const count = pagesCount > 1 ? `${pageSize * (pagesCount - 1)}+` : items.length + '';
    return count === '1' ? `1 match` : `${count} matches`;
};

export const getTextFilterCounterText = (count) => `${count} ${count === 1 ? 'match' : 'matches'}`;

export const paginationAriaLabels = (totalPages) => ({
    nextPageLabel: 'Next page',
    previousPageLabel: 'Previous page',
    pageLabel: pageNumber => `Page ${pageNumber} of ${totalPages || 'all pages'}`,
});

export const tableAriaLabels = (groupLabel) => ({
    allItemsSelectionLabel: () => 'select all',
    itemSelectionLabel: (data, row) => `select ${row.id}`,
    selectionGroupLabel: `${groupLabel} selection`,
});

export const renderAriaLive = ({ firstIndex, lastIndex, totalItemsCount }) =>
    `Displaying ${firstIndex} to ${lastIndex} of ${totalItemsCount}`;

export const getHeaderCounterText = (items, selectedItems) => {
    return selectedItems && selectedItems?.length > 0 ? `(${selectedItems.length}/${items.length})` : `(${items.length})`;
};

export const getHeaderCounterServerSideText = (totalCount, selectedCount) => {
    return selectedCount && selectedCount > 0 ? `(${selectedCount}/${totalCount}+)` : `(${totalCount}+)`;
};