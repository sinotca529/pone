import { LabelComponent } from "../components/ui/FakeLabel";
import { ButtonComponent } from "../components/ui/FakeButton";
import { InputComponent } from "../components/ui/FakeInput";

export type UIComponent = LabelComponent | ButtonComponent | InputComponent;

export interface Screen {
  id: string;
  screenId: string;
  name: string;
  components: UIComponent[];
}
