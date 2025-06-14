import { Card, CardContent } from "@/components/ui/card";
import { Mail, HelpCircle } from "lucide-react";
import logoFooter from "@/assets/img/apple.png"; // alias modern

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background text-foreground mt-10">
      <div className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Logo dan deskripsi */}
        <Card className="bg-transparent shadow-none border-none h-auto md:h-auto">
          <CardContent className="p-0">
            <img
              src={logoFooter}
              alt="Logo Footer"
              className="w-[40px] md:w-[45px] mb-4"
            />
            <p className="text-sm text-muted-foreground">
              © 2024 - Rifky Rifaldy. Semua hak dilindungi.
            </p>
          </CardContent>
        </Card>

        {/* Navigasi */}
        <Card className="bg-transparent shadow-none border-none h-auto mt-5 md:h-auto">
          <CardContent className="p-0">
            <h3 className="text-base font-semibold mb-3">Tentang Kami</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:underline">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cara Top Up
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Bantuan */}
        <Card className="bg-transparent shadow-none border-none h-auto md:h-auto mt-5">
          <CardContent className="p-0">
            <h3 className="text-base font-semibold mb-3">Bantuan</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail size={16} />{" "}
                <a href="#" className="hover:underline">
                  Hubungi CS
                </a>
              </li>
              <li className="flex items-center gap-2">
                <HelpCircle size={16} />{" "}
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li className="flex items-center gap-2">
                <HelpCircle size={16} />{" "}
                <a href="#" className="hover:underline">
                  Panduan Pemula
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Credit bawah (mobile-centered) */}
      <div className="text-center text-muted-foreground text-xs  my-8 ">
        Dibuat dengan ❤️ oleh Rifky Rifaldy
      </div>
    </footer>
  );
};

export default Footer;
