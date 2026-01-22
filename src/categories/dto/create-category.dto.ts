import { IsEnum, IsNotEmpty } from "class-validator";
import { CategoryEnum } from "../../utils/enum/category.enum";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsEnum(CategoryEnum)
  name: CategoryEnum;
}
