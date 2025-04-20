import { LabelComponent } from "../components/ui/FakeLabel";
import { ButtonComponent } from "../components/ui/FakeButton";
import { InputComponent } from "../components/ui/FakeInput";
import { TableComponent } from "../components/ui/FakeTable";

export type UIComponent =
  | LabelComponent
  | ButtonComponent
  | InputComponent
  | TableComponent;

export interface Screen {
  id: string;
  screenId: string;
  name: string;
  components: UIComponent[];
}
