import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-stone-900 tracking-tight mb-6">
              Atlas 3+3
            </h1>
            <p className="text-xl sm:text-2xl text-stone-600 max-w-3xl mx-auto mb-4 font-light">
              A Global Atlas of Sustainable Development Projects
            </p>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto mb-12">
              Curated by the Union of International Architects
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Projects
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                to="/submit"
                className="inline-flex items-center px-8 py-3 border-2 border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-all"
              >
                Submit Your Project
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 mb-6">
                Our Vision
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Atlas 3+3 serves as a comprehensive platform showcasing innovative
                  sustainable development projects from around the world, aligned with the
                  United Nations Sustainable Development Goals.
                </p>
                <p>
                  We envision a global network of architects, urban planners, and
                  communities working together to create resilient, inclusive, and
                  sustainable cities for future generations.
                </p>
                <p>
                  Through this platform, we aim to inspire collaboration, share best
                  practices, and accelerate the implementation of sustainable urban
                  solutions worldwide.
                </p>
              </div>
            </div>

            {/* Vision Highlights */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">17</div>
                <div className="text-sm font-medium text-stone-700 uppercase tracking-wide">
                  SDG Goals
                </div>
              </div>
              <div className="bg-accent-50 p-6 rounded-lg border border-accent-100">
                <div className="text-3xl font-bold text-accent-600 mb-2">5</div>
                <div className="text-sm font-medium text-stone-700 uppercase tracking-wide">
                  UIA Regions
                </div>
              </div>
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                <div className="text-3xl font-bold text-stone-700 mb-2">Global</div>
                <div className="text-sm font-medium text-stone-700 uppercase tracking-wide">
                  Reach
                </div>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">∞</div>
                <div className="text-sm font-medium text-stone-700 uppercase tracking-wide">
                  Impact
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Empowering sustainable urban development through collaboration, innovation,
              and knowledge sharing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Connect
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Build a global community of architects, planners, and stakeholders committed
                to sustainable development.
              </p>
            </div>

            {/* Mission Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Validate
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Ensure quality and credibility through our rigorous review and approval
                process managed by UIA experts.
              </p>
            </div>

            {/* Mission Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Amplify
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Showcase exceptional projects and accelerate the adoption of sustainable
                practices across the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              A streamlined process from submission to global visibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Submit</h3>
                <p className="text-stone-600">
                  Share your sustainable development project through our comprehensive
                  submission form.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-8 left-full w-full">
                <svg
                  className="w-full h-8 text-primary-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 100 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2 12h96m0 0l-8-8m8 8l-8 8"
                  />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Review</h3>
                <p className="text-stone-600">
                  UIA experts carefully review your submission for quality, relevance, and
                  impact.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-8 left-full w-full">
                <svg
                  className="w-full h-8 text-primary-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 100 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2 12h96m0 0l-8-8m8 8l-8 8"
                  />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Publish</h3>
              <p className="text-stone-600">
                Approved projects appear on our global dashboard, reaching thousands of
                professionals worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
            Join the global movement towards sustainable urban development. Submit your
            project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/submit"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-primary-600 transition-all"
            >
              Submit Your Project
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-all"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
