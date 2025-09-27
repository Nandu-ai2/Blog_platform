import AdminPostEditor from '../AdminPostEditor';

export default function AdminPostEditorExample() {
  const handleSave = (data: any) => {
    console.log("Post saved:", data);
    alert("Post saved successfully!");
  };

  const handlePreview = () => {
    console.log("Preview opened");
    alert("Preview functionality would open in a new tab or modal");
  };

  const initialData = {
    title: "Getting Started with React Hooks",
    slug: "getting-started-react-hooks",
    excerpt: "Learn the fundamentals of React Hooks and how they can improve your development workflow.",
    content: `# Getting Started with React Hooks

React Hooks revolutionized how we write React components. In this guide, we'll explore the most commonly used hooks and their practical applications.

## useState Hook

The \`useState\` hook allows you to add state to functional components:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

The \`useEffect\` hook lets you perform side effects in function components:

\`\`\`javascript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

## Best Practices

1. Always include dependencies in the dependency array
2. Use multiple useEffect hooks for different concerns
3. Clean up subscriptions to prevent memory leaks

Happy coding!`,
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    published: false,
    featuredImage: "",
    authorName: "Jane Doe"
  };

  return (
    <AdminPostEditor
      initialData={initialData}
      onSave={handleSave}
      onPreview={handlePreview}
    />
  );
}