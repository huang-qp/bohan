<template>
  <el-icon v-if="icon==='Plus'">
    <Plus />
  </el-icon>
  <el-icon v-else-if="icon==='Minus'">
    <Minus />
  </el-icon>
  <el-icon v-else-if="icon==='CirclePlus'">
    <CirclePlus />
  </el-icon>
  <el-icon v-else-if="icon==='Search'">
    <Search />
  </el-icon>
  <el-icon v-else-if="icon==='Female'">
    <Female />
  </el-icon>
  <el-icon v-else-if="icon==='Male'">
    <Male />
  </el-icon>
  <el-icon v-else-if="icon==='Aim'">
    <Aim />
  </el-icon>
  <el-icon v-else-if="icon==='House'">
    <House />
  </el-icon>
  <el-icon v-else-if="icon==='FullScreen'">
    <FullScreen />
  </el-icon>
  <el-icon v-else-if="icon==='Loading'">
    <Loading />
  </el-icon>
  <el-icon v-else-if="icon==='Link'">
    <Link />
  </el-icon>
  <el-icon v-else-if="icon==='Service'">
    <Service />
  </el-icon>
  <el-icon v-else-if="icon==='Pointer'">
    <Pointer />
  </el-icon>
  <el-icon v-else-if="icon==='Star'">
    <Star />
  </el-icon>
  <el-icon v-else-if="icon==='Notification'">
    <Notification />
  </el-icon>
  <el-icon v-else-if="icon==='Connection'">
    <Connection />
  </el-icon>
  <el-icon v-else-if="icon==='ChatDotRound'">
    <ChatDotRound />
  </el-icon>
  <el-icon v-else-if="icon==='Setting'">
    <Setting />
  </el-icon>
  <el-icon v-else-if="icon==='Clock'">
    <Clock />
  </el-icon>
  <el-icon v-else-if="icon==='Position'">
    <Position />
  </el-icon>
  <el-icon v-else-if="icon==='Discount'">
    <Discount />
  </el-icon>
  <el-icon v-else-if="icon==='Odometer'">
    <Odometer />
  </el-icon>
  <el-icon v-else-if="icon==='ChatSquare'">
    <ChatSquare />
  </el-icon>
  <el-icon v-else-if="icon==='ChatRound'">
    <ChatRound />
  </el-icon>
  <el-icon v-else-if="icon==='ChatLineRound'">
    <ChatLineRound />
  </el-icon>
  <el-icon v-else-if="icon==='ChatLineSquare'">
    <ChatLineSquare />
  </el-icon>
  <el-icon v-else-if="icon==='ChatDotSquare'">
    <ChatDotSquare />
  </el-icon>
  <el-icon v-else-if="icon==='View'">
    <View />
  </el-icon>
  <el-icon v-else-if="icon==='Hide'">
    <Hide />
  </el-icon>
  <el-icon v-else-if="icon==='Unlock'">
    <Unlock />
  </el-icon>
  <el-icon v-else-if="icon==='Lock'">
    <Lock />
  </el-icon>
  <el-icon v-else-if="icon==='RefreshRight'">
    <RefreshRight />
  </el-icon>
  <el-icon v-else-if="icon==='RefreshLeft'">
    <RefreshLeft />
  </el-icon>
  <el-icon v-else-if="icon==='Refresh'">
    <Refresh />
  </el-icon>
  <el-icon v-else-if="icon==='Bell'">
    <Bell />
  </el-icon>
  <el-icon v-else-if="icon==='MuteNotification'">
    <MuteNotification />
  </el-icon>
  <el-icon v-else-if="icon==='User'">
    <User />
  </el-icon>
  <el-icon v-else-if="icon==='Check'">
    <Check />
  </el-icon>
  <el-icon v-else-if="icon==='CircleCheck'">
    <CircleCheck />
  </el-icon>
  <el-icon v-else-if="icon==='Warning'">
    <Warning />
  </el-icon>
  <el-icon v-else-if="icon==='CircleClose'">
    <CircleClose />
  </el-icon>
  <el-icon v-else-if="icon==='Close'">
    <Close />
  </el-icon>
  <el-icon v-else-if="icon==='PieChart'">
    <PieChart />
  </el-icon>
  <el-icon v-else-if="icon==='More'">
    <More />
  </el-icon>
  <el-icon v-else-if="icon==='Compass'">
    <Compass />
  </el-icon>
  <el-icon v-else-if="icon==='Filter'">
    <Filter />
  </el-icon>
  <el-icon v-else-if="icon==='Switch'">
    <Switch />
  </el-icon>
  <el-icon v-else-if="icon==='Select'"><Select /></el-icon>
  <el-icon v-else-if="icon==='SemiSelect'">
    <SemiSelect />
  </el-icon>
  <el-icon v-else-if="icon==='CloseBold'">
    <CloseBold />
  </el-icon>
  <el-icon v-else-if="icon==='EditPen'">
    <EditPen />
  </el-icon>
  <el-icon v-else-if="icon==='Edit'">
    <Edit />
  </el-icon>
  <el-icon v-else-if="icon==='Message'">
    <Message />
  </el-icon>
  <el-icon v-else-if="icon==='MessageBox'">
    <MessageBox />
  </el-icon>
  <el-icon v-else-if="icon==='TurnOff'">
    <TurnOff />
  </el-icon>
  <el-icon v-else-if="icon==='Finished'">
    <Finished />
  </el-icon>
  <el-icon v-else-if="icon==='Delete'">
    <Delete />
  </el-icon>
  <el-icon v-else-if="icon==='Crop'">
    <Crop />
  </el-icon>
  <el-icon v-else-if="icon==='SwitchButton'">
    <SwitchButton />
  </el-icon>
  <el-icon v-else-if="icon==='Operation'">
    <Operation />
  </el-icon>
  <el-icon v-else-if="icon==='Open'">
    <Open />
  </el-icon>
  <el-icon v-else-if="icon==='Remove'">
    <Remove />
  </el-icon>
  <el-icon v-else-if="icon==='ZoomOut'">
    <ZoomOut />
  </el-icon>
  <el-icon v-else-if="icon==='ZoomIn'">
    <ZoomIn />
  </el-icon>
  <el-icon v-else-if="icon==='InfoFilled'">
    <InfoFilled />
  </el-icon>
  <el-icon v-else-if="icon==='CircleCheckFilled'">
    <CircleCheckFilled />
  </el-icon>
  <el-icon v-else-if="icon==='SuccessFilled'">
    <SuccessFilled />
  </el-icon>
  <el-icon v-else-if="icon==='WarningFilled'">
    <WarningFilled />
  </el-icon>
  <el-icon v-else-if="icon==='CircleCloseFilled'">
    <CircleCloseFilled />
  </el-icon>
  <el-icon v-else-if="icon==='QuestionFilled'">
    <QuestionFilled />
  </el-icon>
  <el-icon v-else-if="icon==='WarnTriangleFilled'">
    <WarnTriangleFilled />
  </el-icon>
  <el-icon v-else-if="icon==='UserFilled'">
    <UserFilled />
  </el-icon>
  <el-icon v-else-if="icon==='MoreFilled'">
    <MoreFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Tools'">
    <Tools />
  </el-icon>
  <el-icon v-else-if="icon==='HomeFilled'">
    <HomeFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Menu'">
    <Menu />
  </el-icon>
  <el-icon v-else-if="icon==='UploadFilled'">
    <UploadFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Avatar'">
    <Avatar />
  </el-icon>
  <el-icon v-else-if="icon==='HelpFilled'">
    <HelpFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Share'">
    <Share />
  </el-icon>
  <el-icon v-else-if="icon==='StarFilled'">
    <StarFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Comment'">
    <Comment />
  </el-icon>
  <el-icon v-else-if="icon==='Histogram'">
    <Histogram />
  </el-icon>
  <el-icon v-else-if="icon==='Grid'">
    <Grid />
  </el-icon>
  <el-icon v-else-if="icon==='Promotion'">
    <Promotion />
  </el-icon>
  <el-icon v-else-if="icon==='DeleteFilled'">
    <DeleteFilled />
  </el-icon>
  <el-icon v-else-if="icon==='RemoveFilled'">
    <RemoveFilled />
  </el-icon>
  <el-icon v-else-if="icon==='CirclePlusFilled'">
    <CirclePlusFilled />
  </el-icon>
  <el-icon v-else-if="icon==='ArrowLeft'">
    <ArrowLeft />
  </el-icon>
  <el-icon v-else-if="icon==='ArrowUp'">
    <ArrowUp />
  </el-icon>
  <el-icon v-else-if="icon==='ArrowRight'">
    <ArrowRight />
  </el-icon>
  <el-icon v-else-if="icon==='ArrowDown'">
    <ArrowDown />
  </el-icon>
  <el-icon v-else-if="icon==='ArrowLeftBold'">
    <ArrowLeftBold />
  </el-icon>
  <el-icon v-else-if="icon==='ArrowUpBold'">
    <ArrowUpBold />
  </el-icon>
  <el-icon v-else-if="icon==='ArrowRightBold'">
    <ArrowRightBold />
  </el-icon>
  <el-icon v-else-if="icon==='ArrowDownBold'">
    <ArrowDownBold />
  </el-icon>
  <el-icon v-else-if="icon==='DArrowRight'">
    <DArrowRight />
  </el-icon>
  <el-icon v-else-if="icon==='DArrowLeft'">
    <DArrowLeft />
  </el-icon>
  <el-icon v-else-if="icon==='Download'">
    <Download />
  </el-icon>
  <el-icon v-else-if="icon==='Upload'">
    <Upload />
  </el-icon>
  <el-icon v-else-if="icon==='Top'">
    <Top />
  </el-icon>
  <el-icon v-else-if="icon==='Bottom'">
    <Bottom />
  </el-icon>
  <el-icon v-else-if="icon==='Back'">
    <Back />
  </el-icon>
  <el-icon v-else-if="icon==='Right'">
    <Right />
  </el-icon>
  <el-icon v-else-if="icon==='TopRight'">
    <TopRight />
  </el-icon>
  <el-icon v-else-if="icon==='TopLeft'">
    <TopLeft />
  </el-icon>
  <el-icon v-else-if="icon==='BottomRight'">
    <BottomRight />
  </el-icon>
  <el-icon v-else-if="icon==='BottomLeft'">
    <BottomLeft />
  </el-icon>
  <el-icon v-else-if="icon==='Sort'">
    <Sort />
  </el-icon>
  <el-icon v-else-if="icon==='SortUp'">
    <SortUp />
  </el-icon>
  <el-icon v-else-if="icon==='SortDown'">
    <SortDown />
  </el-icon>
  <el-icon v-else-if="icon==='Rank'">
    <Rank />
  </el-icon>
  <el-icon v-else-if="icon==='CaretLeft'">
    <CaretLeft />
  </el-icon>
  <el-icon v-else-if="icon==='CaretTop'">
    <CaretTop />
  </el-icon>
  <el-icon v-else-if="icon==='CaretRight'">
    <CaretRight />
  </el-icon>
  <el-icon v-else-if="icon==='CaretBottom'">
    <CaretBottom />
  </el-icon>
  <el-icon v-else-if="icon==='DCaret'">
    <DCaret />
  </el-icon>
  <el-icon v-else-if="icon==='Expand'">
    <Expand />
  </el-icon>
  <el-icon v-else-if="icon==='Fold'">
    <Fold />
  </el-icon>
  <el-icon v-else-if="icon==='DocumentAdd'">
    <DocumentAdd />
  </el-icon>
  <el-icon v-else-if="icon==='Document'">
    <Document />
  </el-icon>
  <el-icon v-else-if="icon==='Notebook'">
    <Notebook />
  </el-icon>
  <el-icon v-else-if="icon==='Tickets'">
    <Tickets />
  </el-icon>
  <el-icon v-else-if="icon==='Memo'">
    <Memo />
  </el-icon>
  <el-icon v-else-if="icon==='Collection'">
    <Collection />
  </el-icon>
  <el-icon v-else-if="icon==='Postcard'">
    <Postcard />
  </el-icon>
  <el-icon v-else-if="icon==='ScaleToOriginal'">
    <ScaleToOriginal />
  </el-icon>
  <el-icon v-else-if="icon==='SetUp'">
    <SetUp />
  </el-icon>
  <el-icon v-else-if="icon==='DocumentDelete'">
    <DocumentDelete />
  </el-icon>
  <el-icon v-else-if="icon==='DocumentChecked'">
    <DocumentChecked />
  </el-icon>
  <el-icon v-else-if="icon==='DataBoard'">
    <DataBoard />
  </el-icon>
  <el-icon v-else-if="icon==='DataAnalysis'">
    <DataAnalysis />
  </el-icon>
  <el-icon v-else-if="icon==='CopyDocument'">
    <CopyDocument />
  </el-icon>
  <el-icon v-else-if="icon==='FolderChecked'">
    <FolderChecked />
  </el-icon>
  <el-icon v-else-if="icon==='Files'">
    <Files />
  </el-icon>
  <el-icon v-else-if="icon==='Folder'">
    <Folder />
  </el-icon>
  <el-icon v-else-if="icon==='FolderDelete'">
    <FolderDelete />
  </el-icon>
  <el-icon v-else-if="icon==='FolderRemove'">
    <FolderRemove />
  </el-icon>
  <el-icon v-else-if="icon==='FolderOpened'">
    <FolderOpened />
  </el-icon>
  <el-icon v-else-if="icon==='DocumentCopy'">
    <DocumentCopy />
  </el-icon>
  <el-icon v-else-if="icon==='DocumentRemove'">
    <DocumentRemove />
  </el-icon>
  <el-icon v-else-if="icon==='FolderAdd'">
    <FolderAdd />
  </el-icon>
  <el-icon v-else-if="icon==='FirstAidKit'">
    <FirstAidKit />
  </el-icon>
  <el-icon v-else-if="icon==='Reading'">
    <Reading />
  </el-icon>
  <el-icon v-else-if="icon==='DataLine'">
    <DataLine />
  </el-icon>
  <el-icon v-else-if="icon==='Management'">
    <Management />
  </el-icon>
  <el-icon v-else-if="icon==='Checked'">
    <Checked />
  </el-icon>
  <el-icon v-else-if="icon==='Ticket'">
    <Ticket />
  </el-icon>
  <el-icon v-else-if="icon==='Failed'">
    <Failed />
  </el-icon>
  <el-icon v-else-if="icon==='TrendCharts'">
    <TrendCharts />
  </el-icon>
  <el-icon v-else-if="icon==='List'">
    <List />
  </el-icon>
  <el-icon v-else-if="icon==='Microphone'">
    <Microphone />
  </el-icon>
  <el-icon v-else-if="icon==='Mute'">
    <Mute />
  </el-icon>
  <el-icon v-else-if="icon==='Mic'">
    <Mic />
  </el-icon>
  <el-icon v-else-if="icon==='VideoPause'">
    <VideoPause />
  </el-icon>
  <el-icon v-else-if="icon==='VideoCamera'">
    <VideoCamera />
  </el-icon>
  <el-icon v-else-if="icon==='VideoPlay'">
    <VideoPlay />
  </el-icon>
  <el-icon v-else-if="icon==='Headset'">
    <Headset />
  </el-icon>
  <el-icon v-else-if="icon==='Monitor'">
    <Monitor />
  </el-icon>
  <el-icon v-else-if="icon==='Film'">
    <Film />
  </el-icon>
  <el-icon v-else-if="icon==='Camera'">
    <Camera />
  </el-icon>
  <el-icon v-else-if="icon==='Picture'">
    <Picture />
  </el-icon>
  <el-icon v-else-if="icon==='PictureRounded'">
    <PictureRounded />
  </el-icon>
  <el-icon v-else-if="icon==='Iphone'">
    <Iphone />
  </el-icon>
  <el-icon v-else-if="icon==='Cellphone'">
    <Cellphone />
  </el-icon>
  <el-icon v-else-if="icon==='VideoCameraFilled'">
    <VideoCameraFilled />
  </el-icon>
  <el-icon v-else-if="icon==='PictureFilled'">
    <PictureFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Platform'">
    <Platform />
  </el-icon>
  <el-icon v-else-if="icon==='CameraFilled'">
    <CameraFilled />
  </el-icon>
  <el-icon v-else-if="icon==='BellFilled'">
    <BellFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Location'">
    <Location />
  </el-icon>
  <el-icon v-else-if="icon==='LocationInformation'">
    <LocationInformation />
  </el-icon>
  <el-icon v-else-if="icon==='DeleteLocation'">
    <DeleteLocation />
  </el-icon>
  <el-icon v-else-if="icon==='Coordinate'">
    <Coordinate />
  </el-icon>
  <el-icon v-else-if="icon==='Bicycle'">
    <Bicycle />
  </el-icon>
  <el-icon v-else-if="icon==='OfficeBuilding'">
    <OfficeBuilding />
  </el-icon>
  <el-icon v-else-if="icon==='School'">
    <School />
  </el-icon>
  <el-icon v-else-if="icon==='Guide'">
    <Guide />
  </el-icon>
  <el-icon v-else-if="icon==='AddLocation'">
    <AddLocation />
  </el-icon>
  <el-icon v-else-if="icon==='MapLocation'">
    <MapLocation />
  </el-icon>
  <el-icon v-else-if="icon==='Place'">
    <Place />
  </el-icon>
  <el-icon v-else-if="icon==='LocationFilled'">
    <LocationFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Van'">
    <Van />
  </el-icon>
  <el-icon v-else-if="icon==='Watermelon'">
    <Watermelon />
  </el-icon>
  <el-icon v-else-if="icon==='Pear'">
    <Pear />
  </el-icon>
  <el-icon v-else-if="icon==='NoSmoking'">
    <NoSmoking />
  </el-icon>
  <el-icon v-else-if="icon==='Smoking'">
    <Smoking />
  </el-icon>
  <el-icon v-else-if="icon==='Mug'">
    <Mug />
  </el-icon>
  <el-icon v-else-if="icon==='GobletSquareFull'">
    <GobletSquareFull />
  </el-icon>
  <el-icon v-else-if="icon==='GobletFull'">
    <GobletFull />
  </el-icon>
  <el-icon v-else-if="icon==='KnifeFork'">
    <KnifeFork />
  </el-icon>
  <el-icon v-else-if="icon==='Sugar'">
    <Sugar />
  </el-icon>
  <el-icon v-else-if="icon==='Bowl'">
    <Bowl />
  </el-icon>
  <el-icon v-else-if="icon==='MilkTea'">
    <MilkTea />
  </el-icon>
  <el-icon v-else-if="icon==='Lollipop'">
    <Lollipop />
  </el-icon>
  <el-icon v-else-if="icon==='Coffee'">
    <Coffee />
  </el-icon>
  <el-icon v-else-if="icon==='Chicken'">
    <Chicken />
  </el-icon>
  <el-icon v-else-if="icon==='Dish'">
    <Dish />
  </el-icon>
  <el-icon v-else-if="icon==='IceTea'">
    <IceTea />
  </el-icon>
  <el-icon v-else-if="icon==='ColdDrink'">
    <ColdDrink />
  </el-icon>
  <el-icon v-else-if="icon==='CoffeeCup'">
    <CoffeeCup />
  </el-icon>
  <el-icon v-else-if="icon==='DishDot'">
    <DishDot />
  </el-icon>
  <el-icon v-else-if="icon==='IceDrink'">
    <IceDrink />
  </el-icon>
  <el-icon v-else-if="icon==='IceCream'">
    <IceCream />
  </el-icon>
  <el-icon v-else-if="icon==='Dessert'">
    <Dessert />
  </el-icon>
  <el-icon v-else-if="icon==='IceCreamSquare'">
    <IceCreamSquare />
  </el-icon>
  <el-icon v-else-if="icon==='ForkSpoon'">
    <ForkSpoon />
  </el-icon>
  <el-icon v-else-if="icon==='IceCreamRound'">
    <IceCreamRound />
  </el-icon>
  <el-icon v-else-if="icon==='Food'">
    <Food />
  </el-icon>
  <el-icon v-else-if="icon==='HotWater'">
    <HotWater />
  </el-icon>
  <el-icon v-else-if="icon==='Grape'">
    <Grape />
  </el-icon>
  <el-icon v-else-if="icon==='Fries'">
    <Fries />
  </el-icon>
  <el-icon v-else-if="icon==='Apple'">
    <Apple />
  </el-icon>
  <el-icon v-else-if="icon==='Burger'">
    <Burger />
  </el-icon>
  <el-icon v-else-if="icon==='Goblet'">
    <Goblet />
  </el-icon>
  <el-icon v-else-if="icon==='GobletSquare'">
    <GobletSquare />
  </el-icon>
  <el-icon v-else-if="icon==='OrangeList'">
    <Orange />
  </el-icon>
  <el-icon v-else-if="icon==='Cherry'">
    <Cherry />
  </el-icon>
  <el-icon v-else-if="icon==='Printer'">
    <Printer />
  </el-icon>
  <el-icon v-else-if="icon==='Calendar'">
    <Calendar />
  </el-icon>
  <el-icon v-else-if="icon==='CreditCard'">
    <CreditCard />
  </el-icon>
  <el-icon v-else-if="icon==='Box'">
    <Box />
  </el-icon>
  <el-icon v-else-if="icon==='Money'">
    <Money />
  </el-icon>
  <el-icon v-else-if="icon==='Refrigerator'">
    <Refrigerator />
  </el-icon>
  <el-icon v-else-if="icon==='Cpu'">
    <Cpu />
  </el-icon>
  <el-icon v-else-if="icon==='Football'">
    <Football />
  </el-icon>
  <el-icon v-else-if="icon==='Brush'">
    <Brush />
  </el-icon>
  <el-icon v-else-if="icon==='Suitcase'">
    <Suitcase />
  </el-icon>
  <el-icon v-else-if="icon==='SuitcaseLine'">
    <SuitcaseLine />
  </el-icon>
  <el-icon v-else-if="icon==='Umbrella'">
    <Umbrella />
  </el-icon>
  <el-icon v-else-if="icon==='AlarmClock'">
    <AlarmClock />
  </el-icon>
  <el-icon v-else-if="icon==='Medal'">
    <Medal />
  </el-icon>
  <el-icon v-else-if="icon==='GoldMedal'">
    <GoldMedal />
  </el-icon>
  <el-icon v-else-if="icon==='Present'">
    <Present />
  </el-icon>
  <el-icon v-else-if="icon==='Mouse'">
    <Mouse />
  </el-icon>
  <el-icon v-else-if="icon==='Watch'">
    <Watch />
  </el-icon>
  <el-icon v-else-if="icon==='QuartzWatch'">
    <QuartzWatch />
  </el-icon>
  <el-icon v-else-if="icon==='Magnet'">
    <Magnet />
  </el-icon>
  <el-icon v-else-if="icon==='Help'">
    <Help />
  </el-icon>
  <el-icon v-else-if="icon==='Soccer'">
    <Soccer />
  </el-icon>
  <el-icon v-else-if="icon==='ToiletPaper'">
    <ToiletPaper />
  </el-icon>
  <el-icon v-else-if="icon==='ReadingLamp'">
    <ReadingLamp />
  </el-icon>
  <el-icon v-else-if="icon==='Paperclip'">
    <Paperclip />
  </el-icon>
  <el-icon v-else-if="icon==='MagicStick'">
    <MagicStick />
  </el-icon>
  <el-icon v-else-if="icon==='Basketball'">
    <Basketball />
  </el-icon>
  <el-icon v-else-if="icon==='Baseball'">
    <Baseball />
  </el-icon>
  <el-icon v-else-if="icon==='Coin'">
    <Coin />
  </el-icon>
  <el-icon v-else-if="icon==='Goods'">
    <Goods />
  </el-icon>
  <el-icon v-else-if="icon==='Sell'">
    <Sell />
  </el-icon>
  <el-icon v-else-if="icon==='SoldOut'">
    <SoldOut />
  </el-icon>
  <el-icon v-else-if="icon==='Key'">
    <Key />
  </el-icon>
  <el-icon v-else-if="icon==='ShoppingCart'">
    <ShoppingCart />
  </el-icon>
  <el-icon v-else-if="icon==='ShoppingCartFull'">
    <ShoppingCartFull />
  </el-icon>
  <el-icon v-else-if="icon==='ShoppingTrolley'">
    <ShoppingTrolley />
  </el-icon>
  <el-icon v-else-if="icon==='Phone'">
    <Phone />
  </el-icon>
  <el-icon v-else-if="icon==='Scissor'">
    <Scissor />
  </el-icon>
  <el-icon v-else-if="icon==='Handbag'">
    <Handbag />
  </el-icon>
  <el-icon v-else-if="icon==='ShoppingBag'">
    <ShoppingBag />
  </el-icon>
  <el-icon v-else-if="icon==='Trophy'">
    <Trophy />
  </el-icon>
  <el-icon v-else-if="icon==='TrophyBase'">
    <TrophyBase />
  </el-icon>
  <el-icon v-else-if="icon==='Stopwatch'">
    <Stopwatch />
  </el-icon>
  <el-icon v-else-if="icon==='Timer'">
    <Timer />
  </el-icon>
  <el-icon v-else-if="icon==='CollectionTag'">
    <CollectionTag />
  </el-icon>
  <el-icon v-else-if="icon==='TakeawayBox'">
    <TakeawayBox />
  </el-icon>
  <el-icon v-else-if="icon==='PriceTag'">
    <PriceTag />
  </el-icon>
  <el-icon v-else-if="icon==='Wallet'">
    <Wallet />
  </el-icon>
  <el-icon v-else-if="icon==='Opportunity'">
    <Opportunity />
  </el-icon>
  <el-icon v-else-if="icon==='PhoneFilled'">
    <PhoneFilled />
  </el-icon>
  <el-icon v-else-if="icon==='WalletFilled'">
    <WalletFilled />
  </el-icon>
  <el-icon v-else-if="icon==='GoodsFilled'">
    <GoodsFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Flag'">
    <Flag />
  </el-icon>
  <el-icon v-else-if="icon==='BrushFilled'">
    <BrushFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Briefcase'">
    <Briefcase />
  </el-icon>
  <el-icon v-else-if="icon==='Stamp'">
    <Stamp />
  </el-icon>
  <el-icon v-else-if="icon==='Sunrise'">
    <Sunrise />
  </el-icon>
  <el-icon v-else-if="icon==='Sunny'">
    <Sunny />
  </el-icon>
  <el-icon v-else-if="icon==='Ship'">
    <Ship />
  </el-icon>
  <el-icon v-else-if="icon==='MostlyCloudy'">
    <MostlyCloudy />
  </el-icon>
  <el-icon v-else-if="icon==='PartlyCloudy'">
    <PartlyCloudy />
  </el-icon>
  <el-icon v-else-if="icon==='Sunset'">
    <Sunset />
  </el-icon>
  <el-icon v-else-if="icon==='Drizzling'">
    <Drizzling />
  </el-icon>
  <el-icon v-else-if="icon==='Pouring'">
    <Pouring />
  </el-icon>
  <el-icon v-else-if="icon==='Cloudy'">
    <Cloudy />
  </el-icon>
  <el-icon v-else-if="icon==='Moon'">
    <Moon />
  </el-icon>
  <el-icon v-else-if="icon==='MoonNight'">
    <MoonNight />
  </el-icon>
  <el-icon v-else-if="icon==='Lightning'">
    <Lightning />
  </el-icon>
  <el-icon v-else-if="icon==='ChromeFilled'">
    <ChromeFilled />
  </el-icon>
  <el-icon v-else-if="icon==='Eleme'">
    <Eleme />
  </el-icon>
  <el-icon v-else-if="icon==='ElemeFilled'">
    <ElemeFilled />
  </el-icon>
  <el-icon v-else-if="icon==='ElementPlus'">
    <ElementPlus />
  </el-icon>
  <el-icon v-else-if="icon==='Shop'">
    <Shop />
  </el-icon>
  <el-icon v-else-if="icon==='SwitchFilled'">
    <SwitchFilled />
  </el-icon>
  <el-icon v-else-if="icon==='WindPower'">
    <WindPower />
  </el-icon>
</template>

<script>
export default {
  name: "menuIcon",
};
</script>
<script setup>
import { defineProps } from 'vue'
defineProps({
  icon: {
    type: String,
    default: ''
  }
})
</script>
<style scoped>

</style>
