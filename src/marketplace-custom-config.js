/*
 * Marketplace specific configuration.
 *
 * Every filter needs to have following keys:
 * - id:     Unique id of the filter.
 * - label:  The default label of the filter.
 * - type:   String that represents one of the existing filter components:
 *           BookingDateRangeFilter, KeywordFilter, PriceFilter,
 *           SelectSingleFilter, SelectMultipleFilter.
 * - group:  Is this 'primary' or 'secondary' filter?
 *           Primary filters are visible on desktop layout by default.
 *           Secondary filters are behind "More filters" button.
 *           Read more from src/containers/SearchPage/README.md
 * - queryParamNames: Describes parameters to be used with queries
 *                    (e.g. 'price' or 'pub_amenities'). Most of these are
 *                    the same between webapp URLs and API query params.
 *                    You can't change 'dates', 'price', or 'keywords'
 *                    since those filters are fixed to a specific attribute.
 * - config: Extra configuration that the filter component needs.
 *
 * Note 1: Labels could be tied to translation file
 *         by importing FormattedMessage:
 *         <FormattedMessage id="some.translation.key.here" />
 *
 * Note 2: If you need to add new custom filter components,
 *         you need to take those into use in:
 *         src/containers/SearchPage/FilterComponent.js
 *
 * Note 3: If you just want to create more enum filters
 *         (i.e. SelectSingleFilter, SelectMultipleFilter),
 *         you can just add more configurations with those filter types
 *         and tie them with correct extended data key
 *         (i.e. pub_<key> or meta_<key>).
 */

export const filters = [
  {
    id: 'dates',
    label: 'Dates',
    type: 'BookingDateRangeFilter',
    group: 'primary',
    // Note: BookingDateRangeFilter is fixed filter,
    // you can't change "queryParamNames: ['dates'],"
    queryParamNames: ['dates'],
    config: {},
  },
  {
    id: 'price',
    label: 'Price',
    type: 'PriceFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 1000,
      step: 5,
    },
  },

  {
    id: 'area',
    label: 'Area',
    type: 'AreaFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['pub_area'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0 ,
      max: 1000,
      step: 5,
    },
  },
  {
    id: 'keyword',
    label: 'Keyword',
    type: 'KeywordFilter',
    group: 'primary',
    // Note: KeywordFilter is fixed filter,
    // you can't change "queryParamNames: ['keywords'],"
    queryParamNames: ['keywords'],
    // NOTE: If you are ordering search results by distance
    // the keyword search can't be used at the same time.
    // You can turn on/off ordering by distance from config.js file.
    config: {},
  },
  {
    id: 'type',
    label: 'Type',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_type'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'seasonal', label: 'Seasonal' },
        { key: 'regular', label: 'Regular' },
      ],
    },
  },



  {
    id: 'multipleSeats',
    label: 'multipleSeats',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_type'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'yes', label: 'Yes' },
        { key: 'no', label: 'No' },
      ],
    },
  },
  {
    id: 'amenities',
    label: 'Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.



      options: [
        {
          key: 'bigGameSection',
          label: 'Big Game Section',

         amenitiesOption: [
            {key: 'deer',
              label: 'Deer',

            },
            {
              key: 'elk',
              label: 'Elk',
            },
            {
              key: 'bear',
              label: 'Bear',
            },
            {
              key: 'wildTurkey',
              label: 'Wild Turkey',
            },
            {
              key: 'moose',
              label: 'Moose',
            },
            {
              key: 'otherBigGame',
              label: 'Other Big Game',
            },
          ]
        },




        {
          key: 'smallGameSection',
          label: 'Small Game Section',
          amenitiesOption: [
            {
              key: 'rabbit',
              label: 'Rabbit',
            },
            {
              key: 'quail',
              label: 'Quail',
            },
            {
              key: 'squirrel',
              label: 'Squirrel',
            },
            {
              key: 'pheasant',
              label: 'Pheasant',
            },
            {
              key: 'ptarmigan',
              label: 'Ptarmigan',
            },
            {
              key: 'otherSmallGame',
              label: 'Other Small Game',
            },
            ]
        },
        {
          key: 'fishType',
          label: 'FreshWater Fish',
          amenitiesOption: [
            {
              key: 'bass',
              label: 'Bass',
            },
            {
              key: 'panfish',
              label: 'Panfish',
            },
            {
              key: 'crappie',
              label: 'Crappie',
            },
            {
              key: 'catfish',
              label: 'Catfish',
            },
            {
              key: 'walleye',
              label: 'Walleye',
            },
            {
              key: 'sauger',
              label: 'Sauger',
            },
            {
              key: 'northernPike',
              label: 'Northern Pike',
            },
            {
              key: 'trout',
              label: 'Trout',
            },
            {
              key: 'salmon',
              label: 'Salmon',
            },
            {
              key: 'steelhead',
              label: 'Steelhead',
            },
            {
              key: 'other',
              label: 'Other',
            },

          ]
        },
        {
          key: 'fishType',
          label: 'SaltWater Fish',
          amenitiesOption: [
            {
              key: 'salmon',
              label: 'Salmon',
            },
            {
              key: 'stripedBass,',
              label: 'Striped Bass',
            },
            {
              key: 'flatfish',
              label: 'Flatfish',
            },
            {
              key: 'bluefish',
              label: 'Bluefish',
            },
            {
              key: 'redfish',
              label: 'Redfish',
            },
            {
              key: 'seatrout',
              label: 'Sea Trout',
            },
            {
              key: 'mackerel',
              label: 'Mackerel',
            },
            {
              key: 'mahimahi',
              label: 'Mahi Mahi',
            },
            {
              key: 'tuna',
              label: 'Tuna',
            },
            {
              key: 'shellfish',
              label: 'Shellfish',
            },
            {
              key: 'other',
              label: 'Other',
            },
          ]
        },
        {
          key:'other',
          label:'Other Type',
          amenitiesOption: [
            {
              key: 'geese',
              label: 'Geese',
            },
            {
              key: 'ducks',
              label: 'Ducks',
            },
            {
              key: 'doves',
              label: 'Doves',
            },
            {
              key: 'other',
              label: 'Other Migratory',
            },
          ]
        },


        {
          key:'Regular',
          label:'Regular',
          amenitiesOption: [
            {
              key: 'archery',
              label: 'Archery',
            },
            {
              key: 'guns',
              label: 'Guns',
            },
            {
              key: 'dogsAllowed',
              label: 'Dogs Allowed',
            },
            {
              key: 'fishingPond',
              label: 'Fishing Pond',
            },
            {
              key: 'guestsAllowed',
              label: 'Guests Allowed',
            },
            {
              key: 'childrenAllowed',
              label: 'Children Allowed',
            },
            {
              key: 'alcoholAllowed',
              label: 'Alcohol Allowed',
            },
          ]
        },
        {
          key:'Seasonal',
          label:'Seasonal',
          amenitiesOption: [
            {
              key: 'QDM',
              label: 'QDM',
            },
            {
              key: 'TDM',
              label: 'TDM',
            },
            {
              key: 'pinIn/Out',
              label: 'Pin In/Out',
            },
            {
              key: 'primitiveCamping',
              label: 'Primitive Camping',
            },
            {
              key: 'primitiveCampingPower',
              label: 'Primitive Camping Power',
            },
            {
              key: 'primitiveCampingWater',
              label: 'Primitive Camping Water',
            },
            {
              key: 'Lodging',
              label: 'Lodging',
            },
            {
              key: 'ATV',
              label: 'ATV',
            },
            {
              key: ' RV/CamperAllowed',
              label: ' RV/Camper Allowed',
            },
            {
              key: 'RV/CamperPower',
              label: 'RV/Camper Power',
            },
            {
              key: 'RV/CamperWater',
              label: 'RV/Camper Water',
            },
            {
              key: 'foodPlots',
              label: 'Food Plots',
            },
            {
              key: 'archery',
              label: 'Archery',
            },
            {
              key: 'guns',
              label: 'Guns',
            },
            {
              key: 'dogsAllowed',
              label: 'Dogs Allowed',
            },
            {
              key: 'Baiting/Feeding',
              label: 'Baiting/Feeding',
            },
            {
              key: 'fishingPond',
              label: 'Fishing Pond',
            },
            {
              key: 'guestsAllowed',
              label: 'Guests Allowed',
            },
            {
              key: 'childrenAllowed',
              label: 'Children Allowed',
            },
            {
              key: 'alcoholAllowed',
              label: 'Alcohol Allowed',
            },
          ]
        }
      ],

    },


  },

];




export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Note: queryParamName 'sort' is fixed,
  // you can't change it since Flex API expects it to be named as 'sort'
  queryParamName: 'sort',

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  // Keyword filter is sorting the results already by relevance.
  // If keyword filter is active, we need to disable sorting.
  conflictingFilters: ['keyword'],

  options: [
    { key: 'createdAt', label: 'Newest' },
    { key: '-createdAt', label: 'Oldest' },
    { key: '-price', label: 'Lowest price' },
    { key: 'price', label: 'Highest price' },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevance', label: 'Relevance', longLabel: 'Relevance (Keyword search)' },
  ],
};


export const listingCountry = [
  { key: '', label: 'Select Countries' },
  { key: 'US', label: 'United States' },
  { key: 'CA', label: 'Canada' },

];
export const listingStates = [
  { key: 'AL', parentId:'US', label: 'Alabama' },
  { key: 'AK',parentId:'US', label: 'Alaska' },
  { key: 'AZ',parentId:'US', label: 'Arizona' },
  { key: 'AR',parentId:'US', label: 'Arkansas' },
  { key: 'CA',parentId:'US', label: 'California' },
  { key: 'CO',parentId:'US', label: 'Colorado' },
  { key: 'CT',parentId:'US', label: 'Connecticut' },
  { key: 'DE',parentId:'US', label: 'Delaware' },
  { key: 'DC', parentId:'US', label: 'District of Columbia' },
  { key: 'FL',parentId:'US', label: 'Florida' },
  { key: 'GE',parentId:'US', label: 'Georgia' },
  { key: 'HI',parentId:'US', label: 'Hawaii' },
  { key: 'ID',parentId:'US', label: 'Idaho' },
  { key: 'IL', parentId:'US', label: 'Illinois' },
  { key: 'IN',parentId:'US', label: 'Indiana' },
  { key: 'IA',parentId:'US', label: 'Iowa' },
  { key: 'KS',parentId:'US', label: 'Kansas' },
  { key: 'KY',parentId:'US', label: 'Kentucky' },
  { key: 'LA',parentId:'US', label: 'Louisiana' },
  { key: 'ME',parentId:'US', label: 'Maine' },
  { key: 'MD',parentId:'US', label: 'Maryland' },
  { key: 'MA', parentId:'US', label: 'Massachusetts' },
  { key: 'MI',parentId:'US', label: 'Michigan' },
  { key: 'MN',parentId:'US', label: 'Minnesota' },
  { key: 'MS',parentId:'US', label: 'Mississippi' },
  { key: 'MO',parentId:'US', label: 'Missouri' },
  { key: 'MT', parentId:'US', label: 'Montana' },
  { key: 'NE',parentId:'US', label: 'Nebraska' },
  { key: 'NV',parentId:'US', label: 'Nevada' },
  { key: 'NJ',parentId:'US', label: 'New Hampshire' },
  { key: 'KY',parentId:'US', label: 'New Jersey' },
  { key: 'NM',parentId:'US', label: 'New Mexico' },
  { key: 'NY',parentId:'US', label: 'New York' },
  { key: 'NC',parentId:'US', label: 'North Carolina' },
  { key: 'ND', parentId:'US', label: '"North Dakota' },
  { key: 'OH',parentId:'US', label: 'Ohio' },
  { key: 'OK',parentId:'US', label: 'Oklahoma' },
  { key: 'OR',parentId:'US', label: 'Oregon' },
  { key: 'PA',parentId:'US', label: 'Pennsylvania' },
  { key: 'RI', parentId:'US', label: 'Rhode Island' },
  { key: 'SC',parentId:'US', label: 'South Carolina' },
  { key: 'SD',parentId:'US', label: 'South Dakota' },
  { key: 'TN',parentId:'US', label: 'Tennessee' },
  { key: 'TX',parentId:'US', label: 'Texas' },
  { key: 'UT',parentId:'US', label: 'Utah' },
  { key: 'VT',parentId:'US', label: 'Vermont' },
  { key: 'VA',parentId:'US', label: 'Virginia' },
  { key: 'WA', parentId:'US', label: 'Washington' },
  { key: 'WV',parentId:'US', label: 'West Virginia' },
  { key: 'WI',parentId:'US', label: 'Wisconsin' },
  { key: 'WY',parentId:'US', label: 'Wyoming' },
  { key: 'Alberta',parentId:'CA', label: 'Alberta' },
  { key: 'British Columbia',parentId:'CA', label: 'British Columbia' },
  { key: 'Manitoba',parentId:'CA', label: 'Manitoba' },
  { key: '"New Brunswick',parentId:'CA', label: '"New Brunswick' },
  { key: 'Newfoundland and Labrador',parentId:'CA', label: 'Newfoundland and Labrador' },
  { key: 'Northwest Territories',parentId:'CA', label: 'Northwest Territories' },
  { key: 'Nova Scotia',parentId:'CA', label: 'Nova Scotia' },
  { key: 'Nunavut',parentId:'CA', label: 'Nunavut' },
  { key: 'Ontario',parentId:'CA', label: 'Ontario' },
  { key: 'Prince Edward Island',parentId:'CA', label: 'Prince Edward Island' },
  { key: 'Quebec',parentId:'CA', label: 'Quebec' },
  { key: 'Saskatchewan',parentId:'CA', label: 'Saskatchewan' },
  { key: 'Yukon',parentId:'CA', label: 'Yukon' },
];

