// import { assert } from "chai";
// import * as geocodeApiFormattingHelper from "../../src/server/helpers/geocodeApiFormattingHelper";
// import * as locationService from "../../src/server/services/googlePlacesService";
// import * as serverTypes from "../../src/server/typings";
// import setupSession from "./setupSession";
//
// describe("locationHelperSpec", () => {
//     let db: serverTypes.AboutDevsDatabase = null;
//     setupSession(before, after, beforeEach, afterEach, ($db: serverTypes.AboutDevsDatabase) => {
//         db = $db;
//     });
//     describe("searchCitiesFromGoogle", () => {
//         it("Should work with propertly formatted address",
//             () => locationService.searchCitiesFromGoogle("Rua Henrique Surerus, 28, Juiz de Fora, MG")
//                 .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
//                 .then((res) => {
//                     assert.equal(res.length, 1);
//                     assert.equal(res[0], "Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG");
//                 }));
//         it("Should work with propertly poorly formatted address",
//             () => locationService.searchCitiesFromGoogle(" r Henrique Surerus, 28  Juiz de Fora, /")
//                 .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
//                 .then((res) => {
//                     assert.equal(res.length, 1);
//                     assert.equal(res[0], "Rua Henrique Surerus, 28, Centro, Juiz de Fora, MG");
//                 }));
//         it("Should work with propertly poorly formatted address 2",
//             () => locationService.searchCitiesFromGoogle("Henrique Surerus JF")
//                 .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
//                 .then((res) => {
//                     assert.equal(res.length, 1);
//                     assert.equal(res[0], "Rua Henrique Surerus, Centro, Juiz de Fora, MG");
//                 }));
//         it("Should work with landmarks",
//             () => locationService.searchCitiesFromGoogle("Shopping Alameda JF")
//                 .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
//                 .then((res) => {
//                     assert.equal(res.length, 1);
//                     assert.equal(res[0], "Rua Morais e Castro, 300, Passos, Juiz de Fora, MG");
//                 }));
//
//         it("Should not work with city only by default",
//             () => locationService.searchCitiesFromGoogle("Juiz de Fora MG")
//                 .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
//                 .then((res) => {
//                     assert.equal(res.length, 0);
//                 }));
//
//         it("Should work with city only when specified",
//             () => locationService.searchCitiesFromGoogle("Juiz de Fora MG")
//                 .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r, true))
//                 .then((res) => {
//                     assert.equal(res.length, 1);
//                 }));
//
//         it("Should work when the address is not valid",
//             () => locationService.searchCitiesFromGoogle("This is not a valid city")
//                 .then((r) => geocodeApiFormattingHelper.getFormattedLocations(r))
//                 .then((res) => {
//                     assert.equal(res.length, 0);
//                 }));
//     });
//     describe("searchCities", () => {
//         it("checks the correct behavior", async () => {
//             const searchTerm = "henrique surerus jf";
//             let locationCache = await db.google_places_textsearch_cache.findOne({ search: searchTerm });
//             assert.isNotOk(locationCache);
//             const formattedLocations = await locationService.searchLocationsFormatted(db, searchTerm);
//             assert.equal(1, formattedLocations.length);
//             locationCache = await db.google_places_textsearch_cache.findOne({ search: searchTerm });
//             assert.ok(locationCache);
//         });
//     });
//     describe("getAndSaveCity", () => {
//         it("default case", async () => {
//             const locationFormattedAddress = "Rua Morais e Castro, 300, Passos, Juiz de Fora, MG";
//             const savedLocation = await locationService.getAndSaveCity(db, "Rua Morais e Castro, 300, Passos, Juiz de Fora, MG");
//             assert.equal(savedLocation.formatted_address, locationFormattedAddress);
//         });
//     });
// });
