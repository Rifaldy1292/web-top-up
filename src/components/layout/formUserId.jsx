import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "react-hook-form"; // Gunakan context
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Tidak perlu lagi definisi schema di sini — schema hanya di induk

export function FormUserId({}) {
  const { control, watch } = useFormContext(); // Ambil dari context

  const handleKeyDown = (event) => {
    if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace") {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="flex space-x-4 items-center">
        <div className="w-[63%]">
          <FormField
            control={control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Pemain</FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    patern="[0-9]*"
                    placeholder="Masukkan ID"
                    {...field}
                    onKeyDown={handleKeyDown}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, ""); // Hapus semua non-angka
                      field.onChange(e); // Tetap update ke react-hook-form
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-[30%]">
          <FormField
            control={control}
            name="server"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Server</FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    patern="[0-9]*"
                    placeholder="Masukkan Server"
                    {...field}
                    onKeyDown={handleKeyDown}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, ""); // Hapus semua non-angka
                      field.onChange(e); // Tetap update ke react-hook-form
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* <div className="w-[30%]">
        <FormField
          control={control}
          name="server"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No telpon</FormLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  patern="[0-9]*"
                  placeholder="Masukkan Server"
                  {...field}
                  onKeyDown={handleKeyDown}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ""); // Hapus semua non-angka
                    field.onChange(e); // Tetap update ke react-hook-form
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div> */}
    </>
  );
}
