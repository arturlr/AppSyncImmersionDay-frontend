export const BOOK_FILTERING_PROPERTIES = [
    {
        propertyLabel: 'Title',
        key: 'title',
        groupValuesLabel: 'Title values',
        operators: [':', '!:', '=', '!=']
    },
    {
        propertyLabel: 'Genre',
        key: 'genres',
        groupValuesLabel: 'Genre values',
        operators: [':', '!:'],
        defaultOperator: ":"
    },
    {
        propertyLabel: 'Publication Year',
        key: 'publicationYear',
        groupValuesLabel: 'Publication Year values',
        operators: ['>=', '<=', '=', '!=', '<', '>']
    }
];

export const AUTHOR_FILTERING_PROPERTIES = [

];