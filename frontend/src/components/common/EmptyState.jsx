const EmptyState = ({
  title = "Nothing Found",
}) => {
  return (
    <div className="py-20 text-center">

      <h2 className="text-3xl font-bold text-slate-500">

        {title}

      </h2>

    </div>
  );
};

export default EmptyState;