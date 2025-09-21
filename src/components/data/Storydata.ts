
export type Block = 
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt?: string };

export interface Story {
  title: string;
  blocks: Block[];
}

export interface StoryWithChapters {
  storyTitle: string; 
  synopsis?: string;
  chapters: Record<string, Story>;
}

export const storyData: Record<string, StoryWithChapters> = {
  "story-1": {
    storyTitle: "Cuộc hành trình đầu tiên",
    chapters: {
      "chapter-1": {
        title: "Chapter 1: Mở đầu",
        blocks: [
          { type: "text", content: "Nội dung mở đầu chapter 1..." },
          { type: "image", src: "/files/reading1/singapore.jpg", alt: "Singapore" },
        ],
      },
      "chapter-2": {
        title: "Chapter 2: Tiếp theo",
        blocks: [
          { type: "text", content: "Nội dung chapter 2..." },
          { type: "image", src: "/files/reading1/nus.jpg", alt: "NUS" },
        ],
      },
    },
  },
  "story-2": {
    storyTitle: "Truyện tranh phiêu lưu",
    chapters: {
      "chapter-1": {
        title: "Chapter 1: Bắt đầu",
        blocks: [
          { type: "image", src: "/files/reading1/singapore.jpg", alt: "Singapore" },
          { type: "image", src: "/files/reading1/nus.jpg", alt: "NUS" },
        ],
      },
      "chapter-2": {
        title: "Chapter 2: Tiếp tục",
        blocks: [
          { type: "image", src: "/files/reading1/mathley1.jpg", alt: "Mathley" },
        ],
      },
    },
  },
  "singapore-adventure": {
    storyTitle: "Cuộc phiêu lưu ở Singapore",
    
    chapters: {
      "chapter-0": {
      title: "Văn án",
      blocks: [
        { type: "text", content: `Một chuyến phiêu lưu khám phá Singapore đầy thú vị, từ sân bay Changi hiện đại, đến những con phố tấp nập, quán cà phê ven đường, và khuôn viên NUS rộng lớn. Hành trình này không chỉ mở rộng hiểu biết mà còn truyền cảm hứng cho những trải nghiệm mới.` },
      ],
    },
      "chapter-1": {
      title: "Chapter 1: Khởi hành và Sân bay Changi",
      blocks: [
        { type: "text", content: `Ngày hôm nay, chúng tôi bắt đầu chuyến phiêu lưu đến Singapore. 
Từ lúc rời khỏi nhà, trong lòng tôi đã tràn đầy háo hức. Hành lý gọn gàng, vé máy bay đã sẵn sàng, và tâm trạng tôi hoàn toàn hân hoan. Sau khi vượt qua đoạn đường dài, cuối cùng chúng tôi cũng đến sân bay Changi – một trong những sân bay hiện đại và đẹp nhất thế giới. Không khí nhộn nhịp nhưng vẫn gọn gàng khiến tôi ấn tượng mạnh.` },
        { type: "image", src: "/files/reading1/singapore.jpg", alt: "Sân bay Changi" },
        { type: "text", content: `Chúng tôi dành thời gian tham quan các khu vực trong sân bay. Những cửa hàng, nhà hàng và khu vực nghỉ ngơi đều được thiết kế tinh tế, tạo cảm giác thư giãn. Tôi ghi nhớ từng chi tiết, từ ánh sáng rực rỡ đến những bức tranh trang trí tinh tế. Khi chuẩn bị lên máy bay, tôi cảm thấy hồi hộp và mong chờ những trải nghiệm phía trước.` },
      ],
    },
    "chapter-2": {
      title: "Chapter 2: Khám phá thành phố",
      blocks: [
        { type: "text", content: `Singapore hiện ra trước mắt chúng tôi với vẻ đẹp hiện đại xen lẫn nét văn hóa đặc trưng. Chúng tôi ghé thăm những tòa nhà cao tầng, những con phố sạch sẽ, và các công viên xanh mát. Tôi cảm nhận rõ ràng sự hòa hợp giữa thiên nhiên và đô thị nơi đây. Người dân thân thiện, luôn sẵn lòng hướng dẫn chúng tôi khi cần. Điều này khiến chúng tôi cảm thấy như được chào đón một cách nồng nhiệt.` },
        { type: "text", content: `Chúng tôi dừng chân tại một quán cà phê ven đường, thưởng thức món ăn địa phương và ngắm nhìn dòng người tấp nập. Mỗi góc phố đều có những điều thú vị, từ những bức tường nghệ thuật đến những tiệm sách nhỏ xinh. Tôi chợt nhận ra rằng mỗi bước đi đều là một trải nghiệm mới mẻ.` },
        { type: "image", src: "/files/reading1/nus.jpg", alt: "Trường NUS" },
      ],
    },
    "chapter-3": {
      title: "Chapter 3: Tham quan NUS",
      blocks: [
        { type: "text", content: `Ngày hôm sau, chúng tôi ghé thăm National University of Singapore (NUS). Khuôn viên rộng lớn, hiện đại và đầy màu sắc khiến chúng tôi choáng ngợp. Các tòa nhà học thuật kết hợp hài hòa với cây xanh, hồ nước, và những không gian sinh hoạt ngoài trời. Tôi cảm thấy như đang lạc vào một thành phố thu nhỏ, nơi học tập và thiên nhiên song hành.` },
        { type: "text", content: `Chúng tôi đi bộ qua các khu vực khác nhau, chụp ảnh và trò chuyện với sinh viên địa phương. Họ chia sẻ nhiều câu chuyện thú vị về cuộc sống và học tập tại đây. Những câu chuyện này không chỉ mở rộng hiểu biết của tôi mà còn truyền cảm hứng cho những dự định tương lai.` },
        { type: "image", src: "/files/reading1/nus.jpg", alt: "Campus NUS" },
      ],
    },
    "chapter-4": {
      title: "Chapter 4: Mathley Park và kết thúc ngày",
      blocks: [
        { type: "text", content: `Buổi chiều, chúng tôi đi đến Mathley Park, một khu công viên rộng lớn với nhiều cây xanh và lối đi uốn lượn. Không khí trong lành, mát mẻ, tiếng chim hót líu lo và dòng nước chảy róc rách tạo cảm giác thư giãn tuyệt vời. Chúng tôi ngồi nghỉ dưới những tán cây cổ thụ, trò chuyện và tận hưởng khoảnh khắc yên bình.` },
        { type: "image", src: "/files/reading1/mathley1.jpg", alt: "Mathley Park" },
        { type: "text", content: `Khi hoàng hôn buông xuống, ánh sáng vàng nhạt rọi qua những tán lá tạo ra khung cảnh tuyệt đẹp. Tôi chợt nhận ra rằng mỗi chuyến đi không chỉ là trải nghiệm bên ngoài mà còn là hành trình khám phá bản thân. Ngày kết thúc, chúng tôi quay trở về khách sạn, mang theo những kỷ niệm khó quên và cảm giác hạnh phúc trọn vẹn.` },
      ],
    },
    },
  },
};
