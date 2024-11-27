import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";

const FormField = ({ label, value, onChange }: { label: string, value: string, onChange: (e: any) => void, type?: string }) => (
  <FormControl className="p-2">
    <FormControlLabel>
      <FormControlLabelText className="font-poppins">{label}</FormControlLabelText>
    </FormControlLabel>
    <Input>
      <InputField type="text" className="font-poppins" value={value} onChange={onChange} />
    </Input>
  </FormControl>
);

export default FormField;