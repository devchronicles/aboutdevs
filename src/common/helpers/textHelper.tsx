import * as commonTypes from "../typings/commonTypes";

export function getSearchDisplayText(item: commonTypes.SearchDisplay) {
    switch (item) {
        case commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_2_KM:
            return "Mais recomendados em um raio de 2 km";
        case commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_5_KM:
            return "Mais recomendados em um raio de 5 km";
        case commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_10_KM:
            return "Mais recomendados em um raio de 10 km";
        default:
            return "Ordenados por distância";
    }
}
