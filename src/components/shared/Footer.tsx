import Link from "next/link";

const Footer = () => {
  const quickShareLinks = [
    { text: "Home", href: "#" },
    { text: "Online tuition", href: "#" },
    { text: "Professional development", href: "#" },
    { text: "Resources", href: "#" },
  ];

  const policyLinks = [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
    { text: "Contact Us", href: "#" },
  ];

  return (
    <footer className="bg-white py-12 px-4 md:px-8 lg:px-12">
      <div className="container max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Community Section */}
          <div className="space-y">
            <div className="text-teal-600 font-bold text-4xl">
              LOGO
              <span className="inline-block w-2 h-2 bg-orange-500 rounded-full ml-1 align-top mt-2"></span>
            </div>
            <div className="space-y-4">
              <h3 className="mt-5 text-2xl lg:text-3xl font-semibold font-montserrat uppercase ">
                Join the community
              </h3>
              <p className=" text-gray-600">
                By subscribing you agree to with our Privacy Policy
              </p>
            </div>
          </div>

          {/* Quick Share Section */}
          <div className="space-y-4 lg:mx-auto">
            <h3 className="text-xl lg:text-2xl font-semibold font-montserrat">
              Quick Share
            </h3>
            <nav className="flex flex-col space-y-2">
              {quickShareLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Policy Section */}
          <div className="space-y-4 lg:mx-auto">
            <h3 className="text-xl lg:text-2xl font-semibold font-montserrat">
              Policy
            </h3>
            <nav className="flex flex-col space-y-2">
              {policyLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          © {new Date().getFullYear()} abcdss. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
