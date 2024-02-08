import { title, subtitle } from "@/components/primitives";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";


export default function Manage() {
	return (
		<section className="flex flex-col items-center justify-center mt-10 gap-4 py-8 md:py-10">
				<h1 className={title({size: "sm"})}>
					Manage your classrooms
				</h1>
        
        <div className="flex flex-col items-cent justify-center gap-4 mt-4">
          <Tooltip content='Configure initial classrooms' placement="right">
              <Button color="primary" size="lg">
                Configure Classrooms
              </Button>
            </Tooltip>
            <Tooltip content='View classrooms after initial creation' placement="right">
              <Button color="primary" size="lg">
                View Classrooms
              </Button>
            </Tooltip>
            <Tooltip content='Add a student to a certain classroom(s)' placement="right">
              <Button color="primary" size="lg">
                Add student
              </Button>
            </Tooltip>
        </div>
        
          
        
        
		</section>
	);
}