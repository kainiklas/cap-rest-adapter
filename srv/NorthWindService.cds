using {NorthWind as external} from './external/NorthWind.csn';

@protocol:'rest'
service NorthwindService {

    @readonly
    entity Categories as projection on external.Categories;

}
