import Image from 'next/image';

interface FeedbackCardProps {
  rating: number;
  maxRating: number;
  feedback: string;
  name: string;
  position: string;
  avatarUrl: string | null;
}

export default function FeedbackCard({
  rating = 4,
  maxRating = 5,
  feedback,
  name,
  position,
  avatarUrl,
}: FeedbackCardProps) {
  return (
    <div className="rounded-3xl overflow-hidden shadow-md bg-white">
      <div className="p-6">
        {/* Star Rating */}
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {[...Array(maxRating)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < rating ? 'text-amber-400' : 'text-gray-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-800 font-medium">
            {rating}/{maxRating}
          </span>
        </div>

        {/* Feedback Text */}
        <p className="text-gray-800 mb-6">{feedback}</p>
      </div>

      {/* Author Section */}
      <div className="bg-primary p-6 flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white mr-4">
        {
          avatarUrl ? (
            <Image
              src={avatarUrl?.includes("localhost") ? avatarUrl?.replace("localhost", "10.0.10.33") : avatarUrl}
              alt="Avatar"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )
        }
        </div>
        <div>
          <h3 className="text-white font-medium text-lg">{name}</h3>
          <p className="text-teal-100">{position}</p>
        </div>
      </div>
    </div>
  );
}
