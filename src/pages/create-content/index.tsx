import useCreateContent from "@/Hooks/create-content/useCreateContent";

const CreateContent = () => {
  const { title, setTitle, content, createContent } = useCreateContent();
  return (
    <div>
      <h1>Content</h1>
      <div className="flex my-5">
        <input
          type="text"
          name="title"
          placeholder="Get Started With a Title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-sky-600 p-2.5 rounded-lg text-white hover:bg-sky-700"
          onClick={createContent}
        >
          Generate
        </button>
      </div>
      <div>
        <p>Examples:</p>
        <div className="flex my-5">
          <p className="text-sky-500 font-bold hover:underline hover:cursor-pointer">
            Cyber Security impact with the use of Generative AI
          </p>
        </div>
      </div>

      {content && (
        <div>
          <h1 className="font-extrabold text-xl">Generated Content:</h1>
          <div className="border rounded p-5 shadow my-4">
            <p>{content}</p>
          </div>
          <button className="bg-sky-600 p-2.5 rounded-lg text-white">Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
};
export default CreateContent;
