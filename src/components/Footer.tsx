import Link from 'next/link'
import BeeIcon from './BeeIcon'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BeeIcon size={32} />
              <span className="text-xl font-bold text-white">BreezyHive</span>
            </div>
            <p className="text-sm">
              Connecting customers with skilled tradespeople. Enterprise solutions for modern businesses.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="hover:text-primary transition">Features</Link></li>
              <li><Link href="/business" className="hover:text-primary transition">Enterprise</Link></li>
              <li><Link href="/#pricing" className="hover:text-primary transition">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Mobile App</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2025 BreezyHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
