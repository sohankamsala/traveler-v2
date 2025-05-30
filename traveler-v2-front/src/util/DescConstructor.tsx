function DescConstructor(props: any) {
    const { theDesc } = props;
  
    if (!theDesc) {
      return <p className="font-medium text-cyan-900">Loading...</p>;
    }
  
    const sections = [
      { title: "Geography", content: theDesc[0] },
      { title: "Things to Do", content: theDesc[1] },
      { title: "Facts", content: theDesc[2] },
      { title: "Culture", content: theDesc[3] },
      { title: "Tourism", content: theDesc[4] },
    ];
  
    return (
      <div>
        {sections.map((section, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold text-slate-700 text-lg">{section.title}:</p>
            <p className="font-medium text-cyan-900">
              {section.content ? section.content : "Information not available."}
            </p>
          </div>
        ))}
      </div>
    );
  }
  
  export default DescConstructor;
  