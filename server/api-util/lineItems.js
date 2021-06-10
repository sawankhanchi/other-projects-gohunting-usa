const { calculateQuantityFromDates, calculateTotalFromLineItems } = require('./lineItemHelpers');
const { types } = require('sharetribe-flex-sdk');
const { Money } = types;

// This bookingUnitType needs to be one of the following:
// line-item/night, line-item/day or line-item/units
const bookingUnitType = 'line-item/day';
const bookingUnitTypeRegular = 'line-item/day';
const bookingUnitTypeSeasonal = 'line-item/units';
const PROVIDER_COMMISSION_PERCENTAGE = -10;

/** Returns collection of lineItems (max 50)
 *
 * Each line items has following fields:
 * - `code`: string, mandatory, indentifies line item type (e.g. \"line-item/cleaning-fee\"), maximum length 64 characters.
 * - `unitPrice`: money, mandatory
 * - `lineTotal`: money
 * - `quantity`: number
 * - `percentage`: number (e.g. 15.5 for 15.5%)
 * - `seats`: number
 * - `units`: number
 * - `includeFor`: array containing strings \"customer\" or \"provider\", default [\":customer\"  \":provider\" ]
 *
 * Line item must have either `quantity` or `percentage` or both `seats` and `units`.
 *
 * `includeFor` defines commissions. Customer commission is added by defining `includeFor` array `["customer"]` and provider commission by `["provider"]`.
 *
 * @param {Object} listing
 * @param {Object} bookingData
 * @returns {Array} lineItems
 */
exports.transactionLineItems = (listing, bookingData) => {
  const unitPrice = listing.attributes.price;
  const {regularDiscount} = listing.attributes.publicData;
  const { startDate, endDate,seats,unitType, units, customPackages } = bookingData;


  /**
   * If you want to use pre-defined component and translations for printing the lineItems base price for booking,
   * you should use one of the codes:
   * line-item/night, line-item/day or line-item/units (translated to persons).
   *
   * Pre-definded commission components expects line item code to be one of the following:
   * 'line-item/provider-commission', 'line-item/customer-commission'
   *
   * By default BookingBreakdown prints line items inside LineItemUnknownItemsMaybe if the lineItem code is not recognized. */

  const booking = {
    code: unitType?unitType:bookingUnitType,
    unitPrice,
    units:unitType&&unitType===bookingUnitTypeSeasonal?units:calculateQuantityFromDates(startDate, endDate, unitType?unitType:bookingUnitType),
    seats,
    // quantity: unitType&&unitType===bookingUnitTypeSeasonal?units:calculateQuantityFromDates(startDate, endDate, unitType?unitType:bookingUnitType),
    includeFor: ['customer', 'provider'],
  };
 let customPackagesBooking = [];
 if (customPackages && customPackages.length>0) {
  customPackages.map(pack=>{
    const customPack = {
      code: 'line-item/' + pack.label,
        unitPrice:pack.price,
        units:unitType&&unitType===bookingUnitTypeSeasonal?units:calculateQuantityFromDates(startDate, endDate, unitType?unitType:bookingUnitType),
        seats,
        // quantity: unitType&&unitType===bookingUnitTypeSeasonal?units:calculateQuantityFromDates(startDate, endDate, unitType?unitType:bookingUnitType),
        includeFor: ['customer', 'provider'],
      }
      customPackagesBooking.push(customPack);
  });

 }

  let lineItems = [booking];
  customPackagesBooking && customPackagesBooking.map(pack=>{
    lineItems.push(pack);
  });
  const discountAvailable = regularDiscount && regularDiscount.filter(item=>{
    return parseInt(seats)>parseInt(item.seats);
  });

  let discountPercent = discountAvailable && discountAvailable.length>0 && discountAvailable[0].discount;
  discountPercent = Math.abs(discountPercent) * -1;
  const customerDiscount = discountPercent && {
    code: 'line-item/customer-discount',
    unitPrice: calculateTotalFromLineItems(lineItems),
    percentage: discountPercent,
    includeFor: ['customer', 'provider'],
  };

  customerDiscount && lineItems.push(customerDiscount);

  const providerCommission = {
    code: 'line-item/provider-commission',
    unitPrice: calculateTotalFromLineItems(lineItems),
    percentage: PROVIDER_COMMISSION_PERCENTAGE,
    includeFor: ['provider'],
  };

  lineItems.push(providerCommission);

  return lineItems;
};
