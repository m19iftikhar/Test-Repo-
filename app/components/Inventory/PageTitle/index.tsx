import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";

interface PageTitleProps {
  title: string;
  btnLabel?: string;
  onClick?: () => void | null;
}

const PageTitle = ({title, btnLabel, onClick}: PageTitleProps) => {
  return (
    <div className="d-flex align-item-center justify-between mb-70 flex-wrap gap-1 page-title">
      <h3 className="mb-0">{title}</h3>
      {btnLabel && (
        <PrimaryAnchor
          type="button"
          title={btnLabel}
          func={onClick}
          icon="add"
        />
      )}
    </div>
  );
};

export default PageTitle;
